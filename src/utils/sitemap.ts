export interface SitemapEntry {
  url: string;
  lastmod?: string;
  changefreq?:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority?: number;
}

export function generateSitemapXML(entries: SitemapEntry[]): string {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
          xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
          xmlns:xhtml="http://www.w3.org/1999/xhtml">
  ${entries
    .map(
      (entry) => `  <url>
      <loc>${entry.url}</loc>
      ${entry.lastmod ? `<lastmod>${entry.lastmod}</lastmod>` : ""}
      ${entry.changefreq ? `<changefreq>${entry.changefreq}</changefreq>` : ""}
      ${
        entry.priority !== undefined
          ? `<priority>${entry.priority}</priority>`
          : ""
      }
    </url>`
    )
    .join("\n")}
  </urlset>`;
  return xml.trim();
}

export function generateSitemapIndex(
  sitemaps: { loc: string; lastmod?: string }[]
): string {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${sitemaps
    .map(
      (sitemap) => `  <sitemap>
      <loc>${sitemap.loc}</loc>
      ${sitemap.lastmod ? `<lastmod>${sitemap.lastmod}</lastmod>` : ""}
    </sitemap>`
    )
    .join("\n")}
  </sitemapindex>`;
  return xml.trim();
}

export function getStaticPagesSitemap(): SitemapEntry[] {
  const baseUrl = "https://validmint.com";
  const currentDate = new Date().toISOString().split("T")[0];

  return [
    {
      url: baseUrl,
      lastmod: currentDate,
      changefreq: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/docs/getting-started`,
      lastmod: currentDate,
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/docs/api/validate`,
      lastmod: currentDate,
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/docs/api/fast-validate`,
      lastmod: currentDate,
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/docs/pricing`,
      lastmod: currentDate,
      changefreq: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/docs/data-policy`,
      lastmod: currentDate,
      changefreq: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastmod: currentDate,
      changefreq: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastmod: currentDate,
      changefreq: "yearly",
      priority: 0.5,
    },
  ];
}
