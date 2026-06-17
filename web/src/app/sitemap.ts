import type { MetadataRoute } from "next";
import { resolveSiteUrl } from "@/lib/site-url";

export const dynamic = "force-dynamic";

const CONTENT_UPDATED = new Date("2026-06-17");
const LEGAL_UPDATED = new Date("2026-06-17");

export default function sitemap(): MetadataRoute.Sitemap {
  const base = resolveSiteUrl();

  return [
    {
      url: base,
      lastModified: CONTENT_UPDATED,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/privacy`,
      lastModified: LEGAL_UPDATED,
      changeFrequency: "yearly",
      priority: 0.35,
    },
    {
      url: `${base}/consent`,
      lastModified: LEGAL_UPDATED,
      changeFrequency: "yearly",
      priority: 0.35,
    },
    {
      url: `${base}/terms-consultation`,
      lastModified: LEGAL_UPDATED,
      changeFrequency: "yearly",
      priority: 0.35,
    },
  ];
}
