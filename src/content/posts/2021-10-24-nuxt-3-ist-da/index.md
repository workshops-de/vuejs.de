---
title: "Nuxt.js 3 ist da – jetzt mit TypeScript und Vite Unterstützung"
description: "Nuxt.js 3 ist endlich in der Beta-Phase veröffentlicht und wir konnten begeistert feststellen, dass die neue Server-Engine Nitro sowie die Vue 3 und Vite Unterstützung einfach nur genial sind."
author: "Antony Konstantinidis"
published_at: 2021-10-24T15:00:00.000Z
categories: "vuejs nuxt release"
tutorial_page_order: "1"
header_image: "header.jpg"
---

Nach über einem Jahr Entwicklungszeit und insgesamt fast 2 Jahren Arbeit, ist Nuxt 3 als Open Beta veröffentlicht worden. Wir haben uns für Euch angeschaut was es alles an Neuerungen gibt und nehmen eines direkt vorweg: das Warten hat sich definitiv gelohnt! Die harte Arbeit lässt sich auch schnell an einigen Zahlen erkennen: es wurden 385 Pull Requests zusammengeführt, 229 Issues geschlossen und 925+ Commits gemacht.

Wer bisher gezögert hat, Nuxt.js zu verwenden, weil die Unterstützung für Vue 3 fehlte, darf sich jetzt freuen. Nuxt.js 3 wurde mit der neuesten Version von Vue.js gebaut und beinhaltet alle Vorteile, wie z. B. die [bessere Performance](https://vuejs.de/artikel/vue-3-2-quintessential-quintuplets/), die [Composition API](https://vuejs.de/artikel/composition-api-teil-1/) oder die `script setup`-[Syntax](https://vuejs.org/api/sfc-script-setup.html).

Nuxt.js 3 ist dem Beispiel von Vue.js 3 gefolgt. Die Entwickler haben das Framework komplett neu geschrieben, um TypeScript und ECMAScript Module (ESM) zu unterstützen. Das bedeutet, dass auch `module.exports`-Anweisungen nicht mehr notwendig sind, da die `export default`-Syntax verwendet werden kann.

Selbst in Projekten, die weiterhin mit JavaScript umgesetzt werden, ergeben sich daraus viele Vorteile, die die Developer Experience (DX) betreffen. Ein Beispiel ist die Autocompletion in der Entwicklungsumgebung (IDE). Das Ergebnis der Neufassung ist zudem eine kleinere Paketgröße (20% weniger Vergleich zu Nuxt 2) sowie die verbesserte Leistung.

Die besten Nuxt.js 3 Optimierungen auf einen Blick:

- Auto-Import: für Komponenten und Funktionen aus dem Vue.js und Nuxt.js Paket
- Eine neue Nuxt.js CLI: für einfacheres Initialisieren von Nuxt.js Projekten und die Integration von Modulen
- Nuxt.js Devtools: schnelleres und komfortableres Debugging im Browser
- Nuxt.js Kit: einfachere Modul-Entwicklung (kompatibel mit Nuxt.js 2 und 3)
- Nitro als neue Server-Engine, optimiert auf Kaltstarts und bietet dank dynamischem Code-Splitting eine bessere Leistung
- Bundling-Unterstützung für Webpack 5 und [Vite.js](https://vuejs.de/artikel/vite-a-developers-perspective/), wodurch sowohl Entwicklungs- als auch Produktions-Builds extrem schnell werden

## Mehr Möglichkeiten mit Nitro, Bridge und Suspense

Mit dem Release neu dazugekommen sind Nuxt Nitro, Nuxt Bridge sowie die Integration von `suspense` und Überarbeitung des Data-Fetching.

Nuxt Nitro als neue Server-Engine sorgt für einen schnelleren Kaltstart und erzeugt für die Produktionsumgebung ein universelles `.output`-Verzeichnis. Dieses ist hochoptimiert, minifiziert und enthält keinerlei Nuxt- sowie Node-Abhängigkeiten. Dadurch lässt sich die Anwendung auf jedem System bereitstellen, das JavaScript unterstützt, ob Node.js, Serverless, Workers, Edge-side rendering oder als rein statische Dateien.

Nuxt Nitro ist aufgrund einer automatischen Plattform-Detektion und der Polyfill-Generierung völlig plattformunabhängig.

Ein wichtiger Schritt, da viele Entwickler bereits die [JAMStack](https://jamstack.org/) Architektur für schnelle und dynamische Webseiten oder CDNs (Content Delivery Networks) einsetzen. Auch neue Umgebungen wie Web Worker, um Skripte in einem Hintergrundthread getrennt vom Haupthread auszuführen, oder [Deno](https://deno.com/) (die Node.js Alternative) sorgen bereits für mehr Performance im Web.

### Darf‘s ein bisschen mehr Performance sein? Zum Beispiel 100-mal mehr?

Ein weiterer Vorteil von Nitro ist die Performance. Wie schon erwähnt, wurde die Kaltstart-Performance deutlich erhöht. In Nuxt.js 2 betrug die Kaltstartzeit ca. 250 Millisekunden. Bei Nuxt.js-3 werden dank Nitro nur noch 5 Millisekunden benötigt. Oder kurz gesagt: Mit Nitro ist der Kaltstart um das 75- bis 100-fache schneller! Wow!

Eine weitere Möglichkeit durch die neue Engine ist die Mischung von Server-side Rendering (SSR) und Server-side Generation (SSG) in einer Anwendung. Bis auf das Routinglevel kann man nun entscheiden, wie die Seite sich verhalten soll: statisch, vorgerendert, inkrementell gerendert oder gecached mittels beliebiger HTTP-Caching-Strategie. Kleiner Hinweis: Hierzu möchten wir auch den [Talk von Daniel Roe](https://www.youtube.com/watch?v=ApUPE8b-m04) empfehlen.

### Einfachere Upgrades dank Nuxt.js Bridge

Migrationen auf eine neue Version sind in der Regel immer langwierig und aufwendig. Das Hauptframework sowie alle Pakete und Module müssen migriert und als neue Version bereitgestellt werden. Auch hier hat das Nuxt.js Entwickler-Team gute Arbeit geleistet und ein Tool entwickelt, das den Umstieg erleichtern soll.

Künftig werden Upgrades in Nuxt.js Umgebungen sehr viel einfacher – mittels Nuxt.js Bridge. Natürlich funktionieren ältere Plug-ins und Module weiterhin, da die [Konfigurationsdatei](https://v2.nuxt.com/docs/directory-structure/nuxt-config/#nuxtconfigjs) `nuxt.config.js` kompatibel mit Nuxt 2 bleibt. Auch mehrere Nuxt.js 3 APIs blieben unverändert, um ein progressives Upgrade zu erleichtern.

Wer in einem Nuxt.js 2 Projekt von den Vorzügen der neuen Version profitieren möchte, kann das ebenso. Schließlich werden viele Neuerungen aus Nuxt.js 3 auch auf Nuxt.js 2 übertragen. Dazu gehören:

- TypeScript- und ESM-Support
- Nitro
- CLI und Devtools
- Vite.js
- Composition API sowie auto import
- Nuxt.js Kit

### Optimierte Datenabfrage mit fetch und suspense

Datenabfragen konnten in Nuxt.js Anwendungen bisher sehr kompliziert sein. So musste man vor Version 2.12, um Daten serverseitig zu rendern, die `asyncData` Funktion verwenden. Doch diese stand nur auf Seitenebene zur Verfügung. Der Grund: Serverseitiges Rendering auf Komponentenebene war nicht verfügbar. Deshalb musste man den Umweg gehen, indem man die Daten als `props` an die Komponenten übergab. Eine weitere Möglichkeit war die `fetch` Funktion, die aber nur dazu diente, den Store zu füllen, bevor die Seite gerendert wurde. Mit [Nuxt 2.12](https://v2.nuxt.com/docs/features/data-fetching/) wurde die `fetch` Funktion zwar stark erweitert, was wiederum die Leistung von Nuxt.js verbesserte, aber es gab immer noch ein Problem.

Durch die Überarbeitung gab es viele unterschiedliche Konfigurationsmöglichkeiten, wie man Daten abfragen konnte. Auch die starken Unterschiede in den Nutzungsmöglichkeiten zwischen `fetch` und `asyncData` sorgen weiterhin für Verwirrung bei den Entwicklern.

Die gute Nachricht: In Nuxt.js 3 wurden diese beiden Funktionen im neuen Composable `useAsyncData` vereint. Dadurch kann es wie andere Composition-API-Funktionen in jeder beliebigen Komponenten verwendet werden. Zusätzlich lässt sich bestimmen, ob die Navigation blockiert werden soll. Außerdem werden die Daten nur noch einmal auf dem Server abgefragt und nicht erneut im clientseitigen Browser.

### Herausforderung Abfrage des Ladezustands

Normalerweise möchte man dem Nutzer einen mit einer Datenabfrage einhergehenden Ladezustand anzeigen, damit beispielsweise ein Formular nicht mehrmals abgeschickt wird. Wie dies genau passieren soll, das musste sich der Entwickler selbst überlegen und darum kümmern. Dank der nativen Integration von [suspense](https://vuejs.org/guide/built-ins/suspense.html) in Nuxt, lässt sich so etwas in Zukunft besser und einfacher umsetzen.

## Wie geht es weiter?

Sicherlich werden sich viele Entwickler über die Umstellung auf TypeScript und die Composition API freuen. Auch neue Funktionen wie Teleport, Suspense oder das asynchrone Datenladen wurden sehnlichst erwartet. Hier wird noch einmal deutlich, wieso es sich lohnt, ein „Framework für ein Framework“ einzusetzen. Vieles muss nicht mehr selbst entwickelt werden, sondern steht sofort einsatzbereit zur Verfügung. Das spart Zeit und vor allem Nerven.

Wer Anwendungen mit Vue.js realisieren möchte, wird erkennen, dass Nuxt.js 3 einem viel Arbeit abnimmt. Allein die Performance-Steigerung und User Experience ist schon beachtlich.

Da es derzeit noch nicht so viele Dokumente und Hilfestellungen zu Nuxt.js 3 gibt, sollte man sich nicht entmutigen lassen. Schon bald wird man auf Stack Overflow oder auf Github viele nützliche Ressourcen finden. Wer sich schon immer aktiv an einer Community beteiligen wollte, hat jetzt die Gelegenheit, sich einzubringen. Einen guten Überblick dafür liefert zum Beispiel die [Seite](https://isnuxt3ready.owln.ai) "Is Nuxt 3 ready?", welche übersichtlich darstellt, bei welchen Modulen man sich noch aktiv beteiligen kann, da diese noch nicht mit Nuxt 3 kompatibel sind.

Bei all der Euphorie sollte man allerdngs nicht vergessen, dass sich Nuxt 3 noch in der Beta-Phase befindet. Das heißt: Es kann immer mal zu kleineren Schwierigkeiten kommen. Bis zum ersten Release Candidate sollte man es noch nicht für die Produktion verwenden. Während der Beta-Phase wird fast jeder Commit ein neues npm-Release auslösen. Schaut Euch am besten die zusammengeführten Pull-Requests an, bis die ersten Changelogs in der Dokumentation erstellt werden.

Wir sind auf jeden Fall gespannt, wie es weitergeht und würden uns freuen, wenn Ihr mit dabei seid. In einem [Interview mit heise](https://www.heise.de/news/JavaScript-Nuxt-js-3-unterstuetzt-TypeScript-und-integriert-Vite-js-6214270.html) haben wir noch weitere Eindrücke von uns zu den Neuerungen von Nuxt 3 ausgeführt.

Was haltet ihr von dem Release? Fehlt euch etwas? Werdet ihr in Zukunft eure Vue-Projekte mit Nuxt umsetzen?

## Weitere Informationen

- Nuxt.js Homepage: https://nuxtjs.org
- Nuxt 3 Dokumentation: https://v3.nuxtjs.org/
- Nuxt Nitro: https://v3.nuxtjs.org/concepts/server-engine
- Nuxt 3 Bridge: https://v3.nuxtjs.org/getting-started/bridge/
- Vue 3: https://vuejs.org/
- Vite: https://vite.dev/
- Github: https://github.com/nuxt/framework
- Hilfe & Support: https://v3.nuxtjs.org/community/getting-help/
- Bugs melden: https://v3.nuxtjs.org/community/reporting-bugs/
- Mitmachen: https://v3.nuxtjs.org/community/contribution/
