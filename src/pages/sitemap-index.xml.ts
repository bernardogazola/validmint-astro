import type { APIRoute } from "astro";
import { generateSitemapIndex } from "../utils/sitemap";

export const GET: APIRoute = async () => {
  const currentDate = new Date().toISOString().split("T")[0];

  const sitemaps = [
    {
      loc: "https://validmint.com/sitemap-0.xml",
      lastmod: currentDate,
    },
  ];

  const sitemap = generateSitemapIndex(sitemaps);

  return new Response(sitemap, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
