import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { pageMetadata, SITE_NAME, SITE_URL } from "@/lib/seo";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...pageMetadata({
    title: "Raphael Martinez — Premium Website Design",
    description:
      "Premium website design for luxury brands, builders, and developers — plus GHL system builds for agencies. Cinematic, scroll-driven, built to match the quality of the work behind it.",
    path: "/",
  }),
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: SITE_NAME,
      url: SITE_URL,
      jobTitle: "Premium Website Designer & GHL Systems Specialist",
      knowsAbout: ["Web Design", "Web Development", "GoHighLevel", "SEO"],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      publisher: { "@id": `${SITE_URL}/#person` },
    },
  ],
};

const NAV = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/blog", label: "Blog" },
];

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#05080a] text-neutral-100">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
        <header className="fixed top-0 z-50 w-full">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
            <Link href="/" className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-200">
                Raphael Martinez
              </span>
            </Link>
            <nav className="flex items-center gap-8 font-mono text-xs uppercase tracking-[0.15em] text-neutral-400">
              {NAV.map((n) => (
                <Link key={n.href} href={n.href} className="transition-colors hover:text-teal-300">
                  {n.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="rounded-full border border-white/15 px-4 py-2 text-neutral-100 transition hover:border-teal-300/60 hover:text-teal-300"
              >
                Contact us
              </Link>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-white/10 py-10 font-mono text-xs uppercase tracking-wide text-neutral-500">
          <div className="mx-auto max-w-6xl px-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <span>&copy; {new Date().getFullYear()} Raphael Martinez — Premium website design + GHL systems</span>
            <span>Philippines · working with clients worldwide</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
