/**
 * @typedef {Object} CTAConfig
 * @property {{de: string, en: string}} title
 * @property {{de: string, en: string}} description
 * @property {{de: string, en: string}} buttonText
 * @property {string} buttonUrl
 * @property {string} [image]
 * @property {{de: string, en: string}} [imageAlt]
 */

export const ctas = {
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
      "https://workshops.de/seminare-schulungen-kurse/vuejs-typescript?utm_source=vuejs_de&utm_campaign=tutorial&utm_medium=portal&utm_content=text-top",
    image: "workshops-attendees.png",
    imageAlt: {
      de: "Teilnehmer:innen in der Veranstaltung Vue-Intensiv-Workshop",
      en: "Participants in the Vue Intensive Workshop event",
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
      "https://workshops.de/seminare-schulungen-kurse/vuejs-typescript?utm_source=vuejs_de&utm_campaign=tutorial&utm_medium=portal&utm_content=text-bottom",
    image: "workshops-attendees.png",
    imageAlt: {
      de: "Teilnehmer:innen der Veranstaltung Vue-Intensiv-Workshop",
      en: "Participants of the Vue Intensive Workshop event",
    },
  },
};
