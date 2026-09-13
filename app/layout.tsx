import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import { pageMetadata, SITE_NAME, SITE_URL } from "@/lib/seo";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
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
      "Professional website design, SEO and connected GHL systems for service businesses. Explore the work of Raphael Martinez.",
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
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <noscript>
          <style>{`.menu-toggle{display:none!important}.site-nav{display:flex!important;flex-wrap:wrap;gap:12px}.header-inner{flex-wrap:wrap;gap:18px}`}</style>
        </noscript>
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <footer className="border-t border-white/10 py-10 font-mono text-xs uppercase tracking-wide text-neutral-500">
          <div className="mx-auto max-w-6xl px-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <span>
              &copy; {new Date().getFullYear()} Raphael Martinez — Premium
              website design + GHL systems
            </span>
            <span>Philippines · working with clients worldwide</span>
            <Link href="/privacy" className="hover:text-teal-200">
              Privacy
            </Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
