import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { getAllPosts } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/portfolio", "/blog", "/contact"];
  const postRoutes = getAllPosts().map((p) => `/blog/${p.slug}`);
  const routes = [...staticRoutes, ...postRoutes];

  return routes.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "/blog" || path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/portfolio" ? 0.9 : 0.7,
  }));
}
