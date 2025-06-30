import type { APIRoute } from "astro";
import { generateSitemapXML, getStaticPagesSitemap } from "../utils/sitemap";

export const GET: APIRoute = async () => {
  const entries = getStaticPagesSitemap();
  const sitemap = generateSitemapXML(entries);

  return new Response(sitemap, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
