import { visit } from "unist-util-visit";

// CTA configurations
const ctas = {
  "training-top": {
    title: {
      de: "Keine Lust zu lesen?",
      en: "Don't feel like reading?",
    },
    description: {
      de: "Nicht jeder lernt am besten aus Büchern und Artikeln. Lernen darf interaktiv sein und Spaß machen. Wir bieten dir auch Vue Intensiv-Schulungen an, damit du tiefer in die Thematik einsteigen kannst.",
      en: "Not everyone learns best from books and articles. Learning can be interactive and fun. We also offer Vue Intensive Training, so you can dive deeper into the topic.",
    },
    buttonText: {
      de: "Mehr Informationen zur Vue3-Schulung",
      en: "More information about Vue3 Training",
    },
    buttonUrl:
      "https://workshops.de/seminare-schulungen-kurse/vuejs-modul-1?utm_source=vuejs_de&utm_campaign=tutorial&utm_medium=portal&utm_content=text-top",
    image: "/assets/img/schulungen/shared/attendees.jpg",
    imageAlt: {
      de: "Teilnehmer:innen in der Veranstaltung Vue-Intensiv-Workshop",
      en: "Participants in the Vue Intensive Workshop event",
    },
  },
  "training-middle-1": {
    title: {
      de: "Tiefer einsteigen mit einer Schulung?",
      en: "Want to go deeper with a training?",
    },
    description: {
      de: "Dieses Thema ist nur ein kleiner Teil von dem, was du in unserer Vue-Schulung lernst. In zwei kompakten Modulen begleiten wir dich vom Einstieg bis zur produktionsreifen Anwendung – mit echten Projekten, direktem Feedback und einem erfahrenen Trainer an deiner Seite.",
      en: "This topic is just a small part of what you will learn in our Vue training. In two compact modules, we guide you from the basics to a production-ready application — with real projects, direct feedback, and an experienced trainer by your side.",
    },
    features: {
      de: [
        "Modul 1: Vue Grundlagen & Architektur",
        "Modul 2: Fortgeschrittene Konzepte & Best Practices",
        "Kleine Gruppen, maximaler Lernerfolg",
      ],
      en: [
        "Module 1: Vue Fundamentals & Architecture",
        "Module 2: Advanced Concepts & Best Practices",
        "Small groups, maximum learning success",
      ],
    },
    buttonText: {
      de: "Zur Vue-Schulung",
      en: "Go to Vue Training",
    },
    buttonUrl:
      "https://workshops.de/seminare-schulungen-kurse/vuejs-modul-1?utm_source=vuejs_de&utm_campaign=tutorial&utm_medium=portal&utm_content=text-middle-1",
    image: "/assets/img/schulungen/shared/attendees.jpg",
    imageAlt: {
      de: "Teilnehmer:innen der Vue-Schulung im Workshop",
      en: "Participants of the Vue training workshop",
    },
  },
  "training-middle-2": {
    title: {
      de: "Lieber praktisch lernen?",
      en: "Prefer hands-on learning?",
    },
    description: {
      de: "Artikel erklären das Warum – unsere Schulungen zeigen dir das Wie. In kleinen Gruppen arbeitest du an realen Aufgaben, stellst Fragen in Echtzeit und nimmst direkt anwendbares Wissen mit. Kein Durchklicken von Slides, sondern echtes Coding mit Trainer-Feedback.",
      en: "Articles explain the why — our trainings show you the how. In small groups you work on real tasks, ask questions in real time, and take away directly applicable knowledge. No clicking through slides, but real coding with trainer feedback.",
    },
    features: {
      de: [
        "Hands-on Coding statt Frontalunterricht",
        "Fragen stellen, die du nicht googeln kannst",
        "Zertifikat nach Abschluss",
      ],
      en: [
        "Hands-on coding instead of lectures",
        "Ask questions you can't google",
        "Certificate upon completion",
      ],
    },
    buttonText: {
      de: "Schulungsdetails ansehen",
      en: "View training details",
    },
    buttonUrl:
      "https://workshops.de/seminare-schulungen-kurse/vuejs-modul-1?utm_source=vuejs_de&utm_campaign=tutorial&utm_medium=portal&utm_content=text-middle-2",
    image: "/assets/img/schulungen/shared/attendees.jpg",
    imageAlt: {
      de: "Entwickler:innen beim praktischen Coding in der Vue-Schulung",
      en: "Developers doing hands-on coding in the Vue training",
    },
  },
  "training-bottom": {
    title: {
      de: "Hat dir das Tutorial geholfen?",
      en: "Did this tutorial help you?",
    },
    description: {
      de: 'Wir bieten auch Vue-Intensiv-Schulungen an, um dich möglichst effektiv in das Thema Vue zu begleiten. Im Kurs kannst Du die Fragen stellen, die Du nur schlecht googeln kannst, z.B. "Besserer Weg, um meine Applikation zu strukturieren?". Wir können sie Dir beantworten.',
      en: 'We also offer Vue Intensive Training to guide you as effectively as possible into the topic of Vue. In the course, you can ask the questions that are hard to google, e.g., "Better way to structure my application?". We can answer them for you.',
    },
    buttonText: {
      de: "Jetzt weiter lernen",
      en: "Continue learning now",
    },
    buttonUrl:
      "https://workshops.de/seminare-schulungen-kurse/vuejs-modul-1?utm_source=vuejs_de&utm_campaign=tutorial&utm_medium=portal&utm_content=text-bottom",
    image: "/assets/img/schulungen/shared/attendees.jpg",
    imageAlt: {
      de: "Teilnehmer:innen der Veranstaltung Vue-Intensiv-Workshop",
      en: "Participants of the Vue Intensive Workshop event",
    },
  },
};

/**
 * Remark plugin to transform [[cta:id]] shortcodes into CallToAction components
 */
export function remarkWorkshopHint() {
  return (tree, file) => {
    visit(tree, (node, index, parent) => {
      // Check for paragraphs containing only a CTA shortcode
      if (
        node.type !== "paragraph" ||
        !node.children ||
        node.children.length !== 1
      )
        return;

      const child = node.children[0];
      if (child.type !== "text") return;

      const match = child.value.match(/^\[\[cta:([a-z-]+)\]\]$/);
      if (!match) return;

      const ctaId = match[1];
      const cta = ctas[ctaId];

      if (!cta) {
        console.warn(`CTA "${ctaId}" not found in config`);
        return;
      }

      // Get language from file path (de or en)
      const filePath = file.history?.[0] || file.path || "";
      const lang = filePath.includes("/en/") ? "en" : "de";

      // Build HTML for the CTA
      const featuresHtml =
        cta.features && cta.features[lang]
          ? `<ul class="text-gray-700 dark:text-gray-300 mb-4 space-y-1 list-none pl-0">${cta.features[lang].map((f) => `<li class="flex items-center gap-2"><span>✔</span> ${f}</li>`).join("")}</ul>`
          : "";

      const imageHtml = cta.image
        ? `<div class="flex-shrink-0 md:w-1/2">
            <img src="${cta.image}" alt="${cta.imageAlt[lang]}" class="rounded-lg w-full h-auto shadow-md" loading="lazy">
          </div>`
        : "";

      const html = `<div class="workshop-hint my-8 p-6 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-xl border-2 border-primary-200 dark:border-primary-800 shadow-sm">
  <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-0 mt-0">💡 ${cta.title[lang]}</h3>
  <div class="flex flex-col gap-6${cta.image ? " md:flex-row md:items-center" : ""}">
    <div class="flex-1">
      <p class="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">${cta.description[lang]}</p>
      ${featuresHtml}
      <a href="${cta.buttonUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 bg-primary !text-white font-medium py-3 px-6 rounded-lg hover:bg-primary-700 transition-colors shadow-sm hover:shadow-md">
        ${cta.buttonText[lang]}
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
      </a>
    </div>
    ${imageHtml}
  </div>
</div>`;

      // Replace the paragraph node with an HTML node
      parent.children[index] = {
        type: "html",
        value: html,
      };
    });
  };
}
