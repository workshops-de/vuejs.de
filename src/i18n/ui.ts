/**
 * i18n UI Strings for vuejs.de
 *
 * Usage:
 * import { useTranslations } from '../i18n/utils';
 * const t = useTranslations(lang);
 * t('nav.articles')
 */

export const languages = {
  de: "Deutsch",
  en: "English",
} as const;

export const defaultLang = "de" as const;
export const showDefaultLang = false;

export type Lang = keyof typeof languages;

export const ui = {
  de: {
    // Navigation
    "nav.articles": "Artikel",
    "nav.tutorial": "Tutorial",
    "nav.training": "Schulung",
    "nav.search": "Suche",
    "nav.meetups": "Meetups",
    "nav.team": "Team",
    "nav.tutorials": "Tutorials",

    // Footer
    "footer.navigation": "Navigation",
    "footer.communities": "Communities",
    "footer.followUs": "Folge uns",
    "footer.poweredBy": "Powered by",
    "footer.imprint": "Impressum",
    "footer.privacy": "Datenschutz",

    // Newsletter
    "newsletter.title": "Newsletter",
    "newsletter.description": "Bleibe auf dem Laufenden mit den neuesten Vue.js News, Tutorials und Schulungsangeboten.",
    "newsletter.subscribe": "Newsletter abonnieren",

    // Search
    "search.title": "Suche",
    "search.placeholder": "Artikel durchsuchen...",
    "search.noResults": "Keine Ergebnisse für [SEARCH_TERM] gefunden",
    "search.manyResults": "[COUNT] Ergebnisse für [SEARCH_TERM]",
    "search.oneResult": "1 Ergebnis für [SEARCH_TERM]",
    "search.searching": "Suche nach [SEARCH_TERM]...",
    "search.clear": "Suche leeren",
    "search.loadMore": "Mehr laden",
    "search.browseAll": "Oder durchstöbere alle Artikel",

    // Articles
    "articles.title": "Artikel",
    "articles.description": "Alle Artikel rund um Vue.js, Nuxt, Pinia und mehr",
    "articles.readMore": "Weiterlesen",
    "articles.minRead": "Min. Lesezeit",
    "articles.by": "von",
    "articles.latestArticles": "Neueste Artikel",
    "articles.allArticles": "Alle Artikel",
    "articles.category": "Kategorie",

    // Tutorials
    "tutorials.title": "Tutorials",
    "tutorials.description": "Schritt-für-Schritt Anleitungen für Vue.js",

    // Training
    "training.title": "Vue.js Schulungen",
    "training.description": "Professionelle Vue.js und TypeScript Schulungen",
    "training.cta": "Schulung anfragen",
    "training.allTrainings": "Alle Schulungen",
    "training.findTraining": "Finde die passende Schulung für dein Level und deine Ziele.",

    // Meetups
    "meetups.title": "Meetups",
    "meetups.description": "Vue.js Meetups in Deutschland",

    // Team
    "team.title": "Unser Team",
    "team.description": "Die Menschen hinter vuejs.de",

    // Home
    "home.hero.title": "Vue.js lernen",
    "home.hero.subtitle": "Tutorials, Artikel und Schulungen für Vue.js Entwickler",
    "home.hero.cta": "Jetzt starten",

    // Common
    "common.learnMore": "Mehr erfahren",
    "common.backToHome": "Zurück zur Startseite",
    "common.page": "Seite",
    "common.of": "von",
    "common.previous": "Zurück",
    "common.next": "Weiter",

    // 404
    "404.title": "Seite nicht gefunden",
    "404.description": "Die angeforderte Seite existiert nicht.",

    // Legal
    "legal.imprint": "Impressum",
    "legal.privacy": "Datenschutz",

    // Banner
    "banner.training": "Wir bieten Schulungen an! Von Anfänger bis Experte - inklusive Agentic AI Coding!",

    // Dark Mode
    "darkMode.toggle": "Dark Mode umschalten",

    // Language
    "language.switchTo": "Sprache wechseln",
  },
  en: {
    // Navigation
    "nav.articles": "Articles",
    "nav.tutorial": "Tutorial",
    "nav.training": "Training",
    "nav.search": "Search",
    "nav.meetups": "Meetups",
    "nav.team": "Team",
    "nav.tutorials": "Tutorials",

    // Footer
    "footer.navigation": "Navigation",
    "footer.communities": "Communities",
    "footer.followUs": "Follow us",
    "footer.poweredBy": "Powered by",
    "footer.imprint": "Imprint",
    "footer.privacy": "Privacy Policy",

    // Newsletter
    "newsletter.title": "Newsletter",
    "newsletter.description": "Stay up to date with the latest Vue.js news, tutorials and training offers.",
    "newsletter.subscribe": "Subscribe to Newsletter",

    // Search
    "search.title": "Search",
    "search.placeholder": "Search articles...",
    "search.noResults": "No results found for [SEARCH_TERM]",
    "search.manyResults": "[COUNT] results for [SEARCH_TERM]",
    "search.oneResult": "1 result for [SEARCH_TERM]",
    "search.searching": "Searching for [SEARCH_TERM]...",
    "search.clear": "Clear search",
    "search.loadMore": "Load more",
    "search.browseAll": "Or browse all articles",

    // Articles
    "articles.title": "Articles",
    "articles.description": "All articles about Vue.js, Nuxt, Pinia and more",
    "articles.readMore": "Read more",
    "articles.minRead": "min read",
    "articles.by": "by",
    "articles.latestArticles": "Latest Articles",
    "articles.allArticles": "All Articles",
    "articles.category": "Category",

    // Tutorials
    "tutorials.title": "Tutorials",
    "tutorials.description": "Step-by-step guides for Vue.js",

    // Training
    "training.title": "Vue.js Training",
    "training.description": "Professional Vue.js and TypeScript training courses",
    "training.cta": "Request Training",
    "training.allTrainings": "All Training Courses",
    "training.findTraining": "Find the right training for your level and goals.",

    // Meetups
    "meetups.title": "Meetups",
    "meetups.description": "Vue.js Meetups in Germany",

    // Team
    "team.title": "Our Team",
    "team.description": "The people behind vuejs.de",

    // Home
    "home.hero.title": "Learn Vue.js",
    "home.hero.subtitle": "Tutorials, articles and training for Vue.js developers",
    "home.hero.cta": "Get Started",

    // Common
    "common.learnMore": "Learn more",
    "common.backToHome": "Back to Home",
    "common.page": "Page",
    "common.of": "of",
    "common.previous": "Previous",
    "common.next": "Next",

    // 404
    "404.title": "Page not found",
    "404.description": "The requested page does not exist.",

    // Legal
    "legal.imprint": "Imprint",
    "legal.privacy": "Privacy Policy",

    // Banner
    "banner.training": "We offer training courses! From beginner to expert - including Agentic AI Coding!",

    // Dark Mode
    "darkMode.toggle": "Toggle Dark Mode",

    // Language
    "language.switchTo": "Switch language",
  },
} as const;

// Route translations (for translated URLs)
export const routes = {
  en: {
    artikel: "articles",
    schulungen: "training",
    impressum: "imprint",
    datenschutz: "privacy",
    suche: "search",
    meetups: "meetups",
    team: "team",
    tutorials: "tutorials",
    kategorie: "category",
  },
} as const;



