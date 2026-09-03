import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/portfolio", "/blog", "/blog/premium-website", "/contact"];
  return routes.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "/blog" || path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/portfolio" ? 0.9 : 0.7,
  }));
}
