/**
 * Site configuration - equivalent to Jekyll's _config.yml
 *
 * This config makes the project reusable as a template for:
 * - Angular.DE
 * - ReactJS.DE
 * - VueJS.DE
 */

// Navigation item type
interface NavItem {
  href: string;
  label: string;
  pattern: string;
  external?: boolean;
}

// Community link type
interface CommunityLink {
  name: string;
  href: string;
}

export const siteConfig = {
  // Basic site info
  title: "vuejs.de",
  titleShort: "vuejs.de",
  titleSuffix: "",
  description: "Deine deutsche Community zum Vue.js Framework",
  topic: "Vue.js",
  url: "https://vuejs.de",
  language: "de",

  // Branding colors
  //
  // Full color scales are defined in src/styles/global.css @theme
  // Usage examples:
  //   text-primary, text-primary-500, text-primary-600
  //   bg-primary-100, bg-primary/10
  //   border-accent-200, text-accent-700
  //
  branding: {
    // Primary color (Vue.js green)
    primary: "#42b883",
    primaryDark: "#35495e", // Vue.js dark blue (dark variant)
    primaryLight: "#4ade8b",

    // Primary color scale (for reference, defined in global.css)
    primaryScale: {
      50: "#f0fdf7",
      100: "#dcfce9",
      200: "#bbf7d4",
      300: "#86efb4",
      400: "#4ade8b",
      500: "#42b883", // Base
      600: "#16a35a",
      700: "#158049",
      800: "#16653c",
      900: "#145333",
      950: "#052e19",
    },

    // Accent color (Blue for links, interactive elements)
    accent: "#3b82f6",

    // Accent color scale (for reference, defined in global.css)
    accentScale: {
      50: "#eff6ff",
      100: "#dbeafe",
      200: "#bfdbfe",
      300: "#93c5fd",
      400: "#60a5fa",
      500: "#3b82f6", // Base
      600: "#2563eb",
      700: "#1d4ed8",
      800: "#1e40af",
      900: "#1e3a8a",
      950: "#172554",
    },

    // RGB values for gradients
    primaryRgb: "66, 184, 131", // #42b883
    primaryDarkRgb: "53, 73, 94", // #35495e
    accentRgb: "59, 130, 246", // #3b82f6

    // Hero gradients (light mode)
    heroGradientLight:
      "radial-gradient(at 20% 30%, rgba(66, 184, 131, 0.08) 0px, transparent 50%), radial-gradient(at 80% 20%, rgba(53, 73, 94, 0.1) 0px, transparent 50%), radial-gradient(at 40% 80%, rgba(66, 184, 131, 0.06) 0px, transparent 50%), radial-gradient(at 90% 70%, rgba(53, 73, 94, 0.05) 0px, transparent 50%), linear-gradient(180deg, #fafafa 0%, #f5f5f5 100%)",

    // Hero gradients (dark mode)
    heroGradientDark:
      "radial-gradient(at 20% 30%, rgba(66, 184, 131, 0.15) 0px, transparent 50%), radial-gradient(at 80% 20%, rgba(53, 73, 94, 0.12) 0px, transparent 50%), radial-gradient(at 40% 80%, rgba(66, 184, 131, 0.1) 0px, transparent 50%)",
  },

  // Social media
  twitter_username: "vuejs_de",
  github_username: "workshops-de",
  linkedin_url: "https://www.linkedin.com/company/workshops.de",
  discord_invite: "https://workshops.de/join-discord",

  // Analytics & Tracking
  gtm_property: "GTM-T5VPDDK",
  utm_source: "vuejs_de",

  // URLs
  repository_url: "https://github.com/workshops-de/vuejs.de",

  // Features
  og_generator_enabled: true,

  // Navigation
  navigation: {
    banner: {
      enabled: true,
      message:
        "Wir bieten Schulungen an! Von Anfänger bis Experte - inklusive Agentic AI Coding!",
      href: "https://workshops.de/schulungsthemen/vuejs?utm_source=vuejs_de&utm_campaign=generic_training&utm_medium=portal&utm_content=banner",
    },
    // Main navigation items
    items: [
      { href: "/artikel/", label: "Artikel", pattern: "/artikel" },
      {
        href: "/artikel/vuejs-tutorial-deutsch/",
        label: "Tutorial",
        pattern: "/artikel/vuejs-tutorial-deutsch/",
      },
      {
        href: "/schulungen/vuejs-typescript/",
        label: "Schulung",
        pattern: "/schulungen",
      },
    ] as NavItem[],
  },

  // Footer
  footer: {
    copyright: "Symetics GmbH",
    communities: [
      { name: "Angular.DE", href: "https://angular.de" },
      { name: "ReactJS.DE", href: "https://reactjs.de" },
      { name: "CloudNative.EU", href: "https://cloudnative.eu" },
      { name: "Workshops.DE", href: "https://workshops.de" },
      {
        name: "AI-Automation-Engineers.de",
        href: "https://ai-automation-engineers.de",
      },
    ] as CommunityLink[],
  },

  // Training/Schulungen
  training: {
    mainCourse: "vuejs-typescript",
    provider: "Workshops.DE",
    providerUrl: "https://workshops.de",
    // All available courses
    courses: [
      {
        id: "vuejs-typescript",
        title: "Vue.js 3 & TypeScript",
        description:
          "Intensiv-Schulung für Vue.js 3 mit TypeScript. Lerne die Grundlagen anhand eines praktischen Beispiels.",
        duration: "3 Tage",
        format: "Vor Ort oder Remote",
        icon: "/assets/img/workshops/logo-vue-typescript-schulung.svg",
        url: "/seminare-schulungen-kurse/vuejs-typescript",
        level: "beginner",
      },
      {
        id: "vuejs-javascript",
        title: "Vue.js State Management",
        description:
          "Verwalte den Zustand deiner Vue.js-Anwendungen effizient mit Pinia, der modernen State Management Lösung.",
        duration: "2 Tage",
        format: "Vor Ort oder Remote",
        icon: "/assets/img/schulungen/shared/logo-pinia.svg",
        url: "/seminare-schulungen-kurse/vuejs-state-management-with-pinia",
        level: "advanced",
      },
      {
        id: "vuejs-composition-api",
        title: "Vue.js Composition API",
        description:
          "Intensiv-Schulung zur modernen Composition API in Vue.js. Für sauberen und wartbaren Code.",
        duration: "2 Tage",
        format: "Vor Ort oder Remote",
        icon: "/assets/img/workshops/logo-vuejs-intensiv-schulung.svg",
        url: "/seminare-schulungen-kurse/vuejs-composition-api-schulung",
        level: "advanced",
      },
      {
        id: "frontend-architektur",
        title: "Frontend-Architektur",
        description:
          "Moderne Webentwicklung und Frontend-Architektur. Lerne Best Practices für skalierbare Anwendungen.",
        duration: "3 Tage",
        format: "Vor Ort oder Remote",
        icon: "/assets/img/workshops/logo-frontend-architecture.svg",
        url: "/seminare-schulungen-kurse/frontend-architektur",
        level: "advanced",
      },
    ],
  },
};

// Type for the site config
export type SiteConfig = typeof siteConfig;

// Helper to build UTM URLs
export function buildUtmUrl(
  baseUrl: string,
  campaign: string,
  medium: string = "portal",
  content: string = ""
): string {
  const params = new URLSearchParams({
    utm_source: siteConfig.utm_source,
    utm_campaign: campaign,
    utm_medium: medium,
  });

  if (content) {
    params.set("utm_content", content);
  }

  return `${baseUrl}?${params.toString()}`;
}

// Helper to add UTM params to community links
export function getCommunityLinks() {
  return siteConfig.footer.communities.map((community) => ({
    ...community,
    href: buildUtmUrl(
      community.href,
      "crossmarketing_permanent",
      "portal",
      "footer_nav"
    ),
  }));
}
