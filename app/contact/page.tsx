import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Raphael Martinez",
  description: "Start a premium website or GHL system build.",
};

export default function Contact() {
  return (
    <div className="mx-auto max-w-3xl px-6 pt-40 pb-24">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-teal-300/80">Contact</p>
      <h1 className="font-display mt-4 text-4xl sm:text-5xl">Tell me about the project.</h1>
      <p className="mt-6 max-w-lg text-neutral-400">
        Whether it&apos;s a premium website for a brand that deserves better, or a GHL system your
        agency needs built and wired up correctly — send the details and I&apos;ll reply with an
        honest read, including if it&apos;s not a fit.
      </p>

      <form className="mt-14 grid gap-6 sm:grid-cols-2" method="post" action="mailto:hello@example.com">
        <div className="sm:col-span-1">
          <label className="font-mono text-xs uppercase tracking-wide text-neutral-500" htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            required
            className="mt-2 w-full rounded-lg border border-white/15 bg-white/[0.02] px-4 py-3 text-sm outline-none focus:border-teal-300/60"
          />
        </div>
        <div className="sm:col-span-1">
          <label className="font-mono text-xs uppercase tracking-wide text-neutral-500" htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-2 w-full rounded-lg border border-white/15 bg-white/[0.02] px-4 py-3 text-sm outline-none focus:border-teal-300/60"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="font-mono text-xs uppercase tracking-wide text-neutral-500" htmlFor="project">What are you building?</label>
          <select
            id="project"
            name="project"
            className="mt-2 w-full rounded-lg border border-white/15 bg-white/[0.02] px-4 py-3 text-sm outline-none focus:border-teal-300/60"
          >
            <option>A premium/cinematic website</option>
            <option>A GHL-connected system</option>
            <option>Not sure yet</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="font-mono text-xs uppercase tracking-wide text-neutral-500" htmlFor="message">Details</label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            className="mt-2 w-full rounded-lg border border-white/15 bg-white/[0.02] px-4 py-3 text-sm outline-none focus:border-teal-300/60"
          />
        </div>
        <button
          type="submit"
          className="sm:col-span-2 mt-2 w-fit rounded-full border border-teal-300/40 bg-teal-400/10 px-8 py-3 font-mono text-xs uppercase tracking-wide text-teal-200 hover:bg-teal-400/20"
        >
          Send
        </button>
      </form>

      <div className="mt-16 border-t border-white/10 pt-8 text-sm text-neutral-400">
        <p>Or reach out directly:</p>
        <p className="mt-2">
          WhatsApp: <span className="text-neutral-200">+63 915 216 8012</span>
        </p>
        <p>Based in the Philippines · working with clients worldwide</p>
      </div>
    </div>
  );
}
