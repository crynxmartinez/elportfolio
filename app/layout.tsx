import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "EL Portfolio | Local Full Stack Developer & Web Solutions",
  description: "Hire a local full stack developer for custom web apps, GoHighLevel sites & automation. Expert full stack dev delivering modern solutions.",
  keywords: ["local full stack developer", "local full stack dev", "full stack developer", "web developer", "GoHighLevel developer", "Next.js developer", "web solutions", "custom web apps"],
  authors: [{ name: "El Martinez" }],
  creator: "El Martinez",
  icons: {
    icon: "https://storage.googleapis.com/msgsndr/xzA6eU8kOYmBuwFdr3CF/media/6930ef1ae0f0927bf677b2a8.png",
    apple: "https://storage.googleapis.com/msgsndr/xzA6eU8kOYmBuwFdr3CF/media/6930ef1ae0f0927bf677b2a8.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "EL Portfolio | Local Full Stack Developer & Web Solutions",
    description: "Hire a local full stack developer for custom web apps, GoHighLevel sites & automation. Expert full stack dev delivering modern solutions.",
    siteName: "EL Portfolio",
    images: [
      {
        url: "https://storage.googleapis.com/msgsndr/xzA6eU8kOYmBuwFdr3CF/media/692e2aad2b865e12b2386475.png?v=2",
        width: 1200,
        height: 630,
        alt: "EL Portfolio - Local Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EL Portfolio | Local Full Stack Developer & Web Solutions",
    description: "Hire a local full stack developer for custom web apps, GoHighLevel sites & automation. Expert full stack dev delivering modern solutions.",
    images: ["https://storage.googleapis.com/msgsndr/xzA6eU8kOYmBuwFdr3CF/media/692e2aad2b865e12b2386475.png?v=2"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
