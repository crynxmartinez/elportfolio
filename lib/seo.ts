import type { Metadata } from "next";

const SITE_NAME = "Raphael Martinez";
const SITE_URL = "https://www.raphaelmartinez.dev";
const OG_IMAGE = "/og-image.jpg";

export function pageMetadata({
  title,
  description,
  path = "",
  type = "website",
  publishedTime,
}: {
  title: string;
  description: string;
  path?: string;
  type?: "website" | "article";
  publishedTime?: string;
}): Metadata {
  const url = `${SITE_URL}${path}`;
  const images = [{ url: OG_IMAGE, width: 1200, height: 630, alt: title }];

  const openGraph: Metadata["openGraph"] =
    type === "article"
      ? {
          title,
          description,
          url,
          siteName: SITE_NAME,
          type: "article",
          images,
          ...(publishedTime ? { publishedTime, authors: [SITE_NAME] } : {}),
        }
      : {
          title,
          description,
          url,
          siteName: SITE_NAME,
          type: "website",
          images,
        };

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph,
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE],
    },
  };
}

export { SITE_NAME, SITE_URL, OG_IMAGE };
