import { NextResponse } from "next/server";

/* Receives the contact form and creates a GHL contact, then attaches the
   project details as a note. Runs server-side so GHL_PRIVATE_TOKEN is never
   exposed to the browser - the previous iframe embed avoided that problem by
   handing the whole form to GHL, at the cost of any control over fields or
   styling. */

const GHL_BASE = "https://services.leadconnectorhq.com";

const SERVICES = [
  "Website design",
  "SEO & competitor research",
  "GHL systems & automation",
  "Not sure yet",
] as const;

const BUDGETS = [
  "Under $1,000",
  "$1,000 - $3,000",
  "$3,000 - $6,000",
  "$6,000+",
  "Prefer to discuss",
] as const;

function clean(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value) && value.length <= 254;
}

export async function POST(request: Request) {
  const token = process.env.GHL_PRIVATE_TOKEN;
  const locationId = process.env.GHL_LOCATION_ID;

  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: a real person never fills a field they cannot see.
  if (clean(payload.company, 100)) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(payload.name, 120);
  const email = clean(payload.email, 254);
  const whatsapp = clean(payload.whatsapp, 40);
  const website = clean(payload.website, 300);
  const service = clean(payload.service, 60);
  const budget = clean(payload.budget, 40);
  const message = clean(payload.message, 4000);

  if (!name || !isEmail(email) || !message) {
    return NextResponse.json(
      { error: "Please include your name, a valid email, and a short message." },
      { status: 400 }
    );
  }

  if (!token || !locationId) {
    console.error("Contact form: GHL_PRIVATE_TOKEN or GHL_LOCATION_ID is not set.");
    return NextResponse.json({ error: "config" }, { status: 503 });
  }

  const [firstName, ...rest] = name.split(/\s+/);
  const headers = {
    Authorization: `Bearer ${token}`,
    Version: "2021-07-28",
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  try {
    const contactRes = await fetch(`${GHL_BASE}/contacts/`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        locationId,
        firstName,
        lastName: rest.join(" ") || undefined,
        email,
        phone: whatsapp || undefined,
        website: website || undefined,
        source: "raphaelmartinez.dev contact form",
        tags: ["website enquiry"],
      }),
    });

    const contactData = await contactRes.json();

    // A duplicate contact is a normal outcome, not a failure - the note below
    // still needs to land on whichever record already exists.
    const contactId: string | undefined =
      contactData?.contact?.id ?? contactData?.meta?.contactId;

    if (!contactRes.ok && !contactId) {
      console.error("GHL contact create failed:", JSON.stringify(contactData));
      return NextResponse.json({ error: "upstream" }, { status: 502 });
    }

    if (contactId) {
      const noteBody = [
        `Service: ${SERVICES.includes(service as (typeof SERVICES)[number]) ? service : "Not specified"}`,
        `Budget: ${BUDGETS.includes(budget as (typeof BUDGETS)[number]) ? budget : "Not specified"}`,
        `Website: ${website || "Not provided"}`,
        `WhatsApp: ${whatsapp || "Not provided"}`,
        "",
        "What they want to improve:",
        message,
      ].join("\n");

      const noteRes = await fetch(`${GHL_BASE}/contacts/${contactId}/notes`, {
        method: "POST",
        headers,
        body: JSON.stringify({ body: noteBody }),
      });

      if (!noteRes.ok) {
        // The enquiry itself is already captured; losing the note is a
        // degraded outcome, not a reason to tell the visitor it failed.
        console.error("GHL note create failed:", await noteRes.text());
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "upstream" }, { status: 502 });
  }
}
