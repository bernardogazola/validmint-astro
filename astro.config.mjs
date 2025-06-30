// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import starlightThemeFlexoki from "starlight-theme-flexoki";

import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  site: "https://validmint.com",
  integrations: [
    starlight({
      plugins: [starlightThemeFlexoki()],
      title: "Valid Mint",
      description:
        "High-performance email domain validation API with sub-20ms latency",
      head: [
        {
          tag: "meta",
          attrs: {
            property: "og:image",
            content: "https://validmint.com/og-image.png",
          },
        },
        {
          tag: "meta",
          attrs: {
            name: "twitter:image",
            content: "https://validmint.com/og-image.png",
          },
        },
        {
          tag: "script",
          content:
            "window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };",
        },
        {
          tag: "script",
          attrs: {
            src: "/_vercel/insights/script.js",
            defer: true,
          },
        },
      ],
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
    ssr: {
      noExternal: ["@radix-ui/*"],
    },
    build: {
      cssMinify: "lightningcss",
      rollupOptions: {
        output: {
          manualChunks: {
            "react-vendor": ["react", "react-dom"],
            "ui-vendor": [
              "@radix-ui/react-dialog",
              "@radix-ui/react-dropdown-menu",
              "@radix-ui/react-tabs",
            ],
          },
        },
      },
    },
  },

  adapter: vercel(),

  compressHTML: true,

  image: {
    remotePatterns: [{ protocol: "https" }],
  },

  prefetch: {
    prefetchAll: true,
    defaultStrategy: "viewport",
  },
});
