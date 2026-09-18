import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { getAllPosts } from "@/lib/posts";
import { PROJECTS } from "@/lib/data";
import { SERVICES } from "@/lib/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/portfolio",
    "/services",
    "/about",
    "/blog",
    "/contact",
    "/testimonials",
    "/privacy",
  ];
  const postRoutes = getAllPosts().map((p) => `/blog/${p.slug}`);
  const routes = [
    ...staticRoutes,
    ...SERVICES.map((s) => `/services/${s.slug}`),
    ...PROJECTS.map((p) => `/portfolio/${p.slug}`),
    ...postRoutes,
  ];

  return routes.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "/blog" || path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/portfolio" ? 0.9 : 0.7,
  }));
}
