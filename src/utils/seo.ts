export interface WebsiteStructuredData {
  "@context": "https://schema.org";
  "@type": "WebSite";
  name: string;
  description: string;
  url: string;
  potentialAction?: {
    "@type": "SearchAction";
    target: {
      "@type": "EntryPoint";
      urlTemplate: string;
    };
    "query-input": string;
  };
}

export interface OrganizationStructuredData {
  "@context": "https://schema.org";
  "@type": "Organization";
  name: string;
  url: string;
  logo: string;
  description: string;
  sameAs?: string[];
  contactPoint?: {
    "@type": "ContactPoint";
    contactType: string;
    email?: string;
    url?: string;
  };
}

export interface SoftwareApplicationStructuredData {
  "@context": "https://schema.org";
  "@type": "SoftwareApplication";
  name: string;
  applicationCategory: string;
  operatingSystem: string;
  description: string;
  url: string;
  offers?: {
    "@type": "Offer";
    price: string;
    priceCurrency: string;
  };
  aggregateRating?: {
    "@type": "AggregateRating";
    ratingValue: string;
    ratingCount: string;
  };
}

export interface FAQStructuredData {
  "@context": "https://schema.org";
  "@type": "FAQPage";
  mainEntity: Array<{
    "@type": "Question";
    name: string;
    acceptedAnswer: {
      "@type": "Answer";
      text: string;
    };
  }>;
}

export interface BreadcrumbStructuredData {
  "@context": "https://schema.org";
  "@type": "BreadcrumbList";
  itemListElement: Array<{
    "@type": "ListItem";
    position: number;
    name: string;
    item?: string;
  }>;
}

export function generateWebsiteSchema(): WebsiteStructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Valid Mint",
    description:
      "High-performance email domain validation API with sub-20ms latency",
    url: "https://validmint.com",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://validmint.com/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function generateOrganizationSchema(): OrganizationStructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Valid Mint",
    url: "https://validmint.com",
    logo: "https://validmint.com/og-image.png",
    description:
      "Provider of high-performance email validation and domain security analysis APIs",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "technical support",
      email: "support@validmint.com",
      url: "https://validmint.com/support",
    },
  };
}

export function generateAPISchema(): SoftwareApplicationStructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Valid Mint Email Validation API",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web API",
    description:
      "RESTful API for email domain validation with comprehensive security analysis and sub-20ms response times",
    url: "https://validmint.com",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "127",
    },
  };
}

export function generateBreadcrumbSchema(
  items: Array<{ name: string; url?: string }>
): BreadcrumbStructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem" as const,
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function combineStructuredData(...schemas: any[]): any {
  return {
    "@context": "https://schema.org",
    "@graph": schemas.map((schema) => {
      const { "@context": _, ...rest } = schema;
      return rest;
    }),
  };
}
