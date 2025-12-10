import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

const staticRoutes = [
  { path: "/", priority: 1.0 },
  { path: "/about", priority: 0.7 },
  { path: "/contact", priority: 0.7 },
  { path: "/gallery", priority: 0.7 },
  { path: "/datenschutz", priority: 0.5 },
  { path: "/impressum", priority: 0.5 },
  { path: "/demo", priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return staticRoutes.map(({ path, priority }) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority,
  }));
}
