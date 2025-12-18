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
  icon?: string; // Heroicon name: 'document-text' | 'book-open' | 'academic-cap' | etc.
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

  // Branding - colors defined in src/styles/global.css @theme
  // Usage: text-primary, bg-primary-500, border-accent-200, etc.
  branding: {
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
  gtm_property: "GTM-PNQ82ZX",
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
      {
        href: "/artikel/",
        label: "Artikel",
        pattern: "/artikel",
        icon: "document-text",
      },
      {
        href: "/artikel/vuejs-tutorial-deutsch-anfaenger/",
        label: "Tutorial",
        pattern: "/artikel/vuejs-tutorial-deutsch-anfaenger/",
        icon: "book-open",
      },
      {
        href: "/schulungen/vuejs-typescript/",
        label: "Schulung",
        pattern: "/schulungen",
        icon: "academic-cap",
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
    // All available courses with i18n support
    courses: [
      {
        id: "vuejs-typescript",
        title: { de: "Vue.js 3 & TypeScript", en: "Vue.js 3 & TypeScript" },
        description: {
          de: "Intensiv-Schulung für Vue.js 3 mit TypeScript. Lerne die Grundlagen anhand eines praktischen Beispiels.",
          en: "Intensive training for Vue.js 3 with TypeScript. Learn the fundamentals through a practical example.",
        },
        duration: { de: "3 Tage", en: "3 Days" },
        format: { de: "Vor Ort oder Remote", en: "On-Site or Remote" },
        icon: "/assets/img/workshops/logo-vue-typescript-schulung.svg",
        url: "/seminare-schulungen-kurse/vuejs-typescript",
        level: "beginner",
      },
      {
        id: "vuejs-state-management",
        title: { de: "Vue.js State Management", en: "Vue.js State Management" },
        description: {
          de: "Verwalte den Zustand deiner Vue.js-Anwendungen effizient mit Pinia, der modernen State Management Lösung.",
          en: "Efficiently manage the state of your Vue.js applications with Pinia, the modern state management solution.",
        },
        duration: { de: "2 Tage", en: "2 Days" },
        format: { de: "Vor Ort oder Remote", en: "On-Site or Remote" },
        icon: "/assets/img/schulungen/shared/logo-pinia.svg",
        url: "/seminare-schulungen-kurse/vuejs-state-management-with-pinia",
        level: "advanced",
      },
      {
        id: "vuejs-composition-api",
        title: { de: "Vue.js Composition API", en: "Vue.js Composition API" },
        description: {
          de: "Intensiv-Schulung zur modernen Composition API in Vue.js. Für sauberen und wartbaren Code.",
          en: "Intensive training on the modern Composition API in Vue.js. For clean and maintainable code.",
        },
        duration: { de: "2 Tage", en: "2 Days" },
        format: { de: "Vor Ort oder Remote", en: "On-Site or Remote" },
        icon: "/assets/img/workshops/logo-vuejs-intensiv-schulung.svg",
        url: "/seminare-schulungen-kurse/vuejs-composition-api-schulung",
        level: "advanced",
      },
      {
        id: "frontend-architektur",
        title: { de: "Frontend-Architektur", en: "Frontend Architecture" },
        description: {
          de: "Moderne Webentwicklung und Frontend-Architektur. Lerne Best Practices für skalierbare Anwendungen.",
          en: "Modern web development and frontend architecture. Learn best practices for scalable applications.",
        },
        duration: { de: "3 Tage", en: "3 Days" },
        format: { de: "Vor Ort oder Remote", en: "On-Site or Remote" },
        icon: "/assets/img/workshops/logo-frontend-architecture.svg",
        url: "/seminare-schulungen-kurse/frontend-architektur",
        level: "advanced",
      },
    ],
  },
};

// Type for the site config
export type SiteConfig = typeof siteConfig;

// Type for i18n text
export type I18nText = { de: string; en: string };

// Type for language
export type Lang = "de" | "en";

// Helper to get localized course data
export function getLocalizedCourses(lang: Lang = "de") {
  return siteConfig.training.courses.map((course) => ({
    ...course,
    title: course.title[lang],
    description: course.description[lang],
    duration: course.duration[lang],
    format: course.format[lang],
  }));
}

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
