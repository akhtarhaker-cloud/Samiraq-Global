import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: "https://samiraqglobal.com", lastModified: new Date() }];
}
