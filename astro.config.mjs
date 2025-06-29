// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import starlightThemeFlexoki from "starlight-theme-flexoki";

import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      plugins: [starlightThemeFlexoki()],
      title: "Valid Mint",
      description:
        "High-performance email domain validation API with sub-20ms latency",
      sidebar: [
        {
          label: "Getting Started",
          items: [
            { label: "Quick Start", slug: "docs/getting-started" },
            { label: "Pricing Plans", slug: "docs/pricing" },
            { label: "Data Policy", slug: "docs/data-policy" },
          ],
        },
        {
          label: "API Endpoints",
          collapsed: false,
          items: [
            {
              label: "Full Validation",
              slug: "docs/api/validate",
            },
            {
              label: "Fast Validation",
              slug: "docs/api/fast-validate",
            },
          ],
        },
      ],
      customCss: ["./src/styles/global.css"],
      disable404Route: true,
    }),
    react(),
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  adapter: vercel(),
});
