---
title: "VitePress: Eine neue Ära der schnellen und flexiblen Static Site Generation"
description: "VitePress, ein Vue-basierter Generator für statische Websites, zeichnet sich durch die schnelle Erstellung von technischen Dokumenten mit Markdown, Theming und i18n aus."
author: "Robin Böhm"
published_at: 2024-03-19 19:30:00.000000Z
categories: "vitepress tooling development"
---

## Einführung in VitePress

VitePress ist ein statischer Website-Generator (SSG), der speziell für die Erstellung schneller, inhaltsorientierter Websites entwickelt wurde.
Es wurde vom Vue-Team als Alternative zu VuePress 1.x entwickelt.

Einige wichtige Dinge, die man über VitePress wissen sollte:

### Was ist VitePress

- VitePress nimmt Markdown-Inhalte als Input, wendet Themes/Layouts an und generiert vorgerenderte statische HTML-Seiten.

- Es wurde von Grund auf entwickelt, um eine hervorragende Entwicklererfahrung und einen optimierten Produktionsaufbau zu bieten.

- Unter der Haube verwendet VitePress Vite, um das Frontend zu bundeln und Vue 3 für die SSR-Generierung. Dies ermöglicht es, im Vergleich zu traditionellen SSGs extrem schnell zu sein.

### Übersicht der Use Cases

- VitePress eignet sich hervorragend für Dokumentations-Sites. Sein Default-Theme ist für technische Dokumentationen konzipiert und betreibt z.B. auch die VitePress-Website selbst.

- Es eignet sich auch hervorragend für Blogs, Portfolios und Marketing-Seiten. VitePress macht es einfach, Daten von Rest-APIs und Co abzurufen und Seiten somit dynamisch zu generieren.

- Im Grunde genommen jede inhaltsorientierte Website, die nicht stark auf nutzergenerierte Inhalte angewiesen ist. Die Daten müssen zum Zeitpunkt der Erstellung statisch generierbar sein.

### Was macht Vitepress so besonders?

- Rasend schnelle Geschwindigkeit - angetrieben von Vite und dem optimierten Build von Vue 3
- Ausgezeichnete Entwicklererfahrung - Hot Reload, Markdown-Erweiterungen, Vue-Komponenten
- Flexible Thematisierung und Anpassung über Vue-Komponenten
- Integrierte Suche, Markdown-Erweiterungen und mehrsprachige Unterstützung
- Einfache Bereitstellung statischer Websites

Zusammenfassend lässt sich sagen, dass VitePress darauf abzielt, die schnellste und angenehmste Art zu sein, inhaltsorientierte Websites zu erstellen.
Mit einem speziellen Fokus auf Dokumentationen, Blogs, Marketingseiten und mehr.

## Erfahrung für Entwickler

VitePress zielt besonders auf eine große Developer Experience (DX) bei der Arbeit mit Markdown-Inhalten ab.

- **Hot Module Reload Updates** - Vite bietet sofortige Updates ohne vollständiges Neuladen der Seite. Änderungen an Markdown- und Vue-Komponenten werden innerhalb von 100 ms im Browser angezeigt. Dies sorgt für einen extrem schnellen Workflow.

- **Eingebaute Markdown-Funktionen** - VitePress wird mit einer Reihe von fortgeschrittenen Markdown-Funktionen ausgeliefert, einschließlich Frontmatter, Syntax-Hervorhebung, Tabellen und mehr. Dies macht es ideal für die technische Dokumentation.

- **Vue-Komponenten in Markdown** - Jede Markdown-Datei wird in eine Vue-Komponente kompiliert, so dass Sie interaktive Vue-Komponenten direkt in Markdown einbetten können. So lassen sich statische Inhalte mit dynamischen Vue-Komponenten mischen.

## Performance

VitePress ist in mehreren Schlüsselbereichen auf Leistung optimiert:

### Schnelles initiales Laden

Beim ersten Besuch einer Seite wird das statische, vorgerenderte HTML für eine schnelle Ladegeschwindigkeit und optimale SEO generiert.
Die Seite lädt dann ein JavaScript-Bundle, das die Seite in ein Vue SPA über Hydration verwandelt.
Entgegen der üblichen SSGs ist dieser Hydrationsprozess dank der Optimierungen in Vue 3 und Vite tatsächlich extrem schnell.

### Schnelle Navigation

Noch wichtiger ist, dass das SPA-Modell zu einem besseren Nutzererlebnis nach dem Laden führt. Nachfolgende Navigation innerhalb der Website führt nicht mehr zu einem vollständigen Neuladen der Seite. Stattdessen wird der Seiteninhalt abgerufen und dynamisch aktualisiert. VitePress holt auch Seitenabschnitte für Links im Viewport vor. In den meisten Fällen fühlt sich die Navigation sofort an.

### Interaktivität ohne großen Payload

Um die Einbindung von dynamischen Vue-Teilen in statisches Markdown zu ermöglichen, wird jede Seite in eine Vue-Komponente kompiliert. Dies mag ineffizient erscheinen, aber Vue trennt statische und dynamische Teile und minimiert so die Größe des Payloads. Beim ersten Laden werden statische Teile während der Hydrierung übersprungen.

## Vergleich zu VuePress

VitePress ist der geistige Nachfolger von VuePress. Das ursprüngliche VuePress basierte auf Vue 2 und Webpack. Mit Vue 3 und Vite unter der Haube, bietet VitePress deutlich bessere DX, bessere Performance in Production, ein poliertes Default-Thema und eine flexiblere Anpassung API.

Die Unterschiede zwischen VitePress und VuePress liegen hauptsächlich in den Möglichkeiten für Theming und Customization. Wenn Sie VuePress 1 mit dem Default-Theme verwenden, sollte es relativ einfach sein, zu VitePress zu migrieren.

Es wurden auch Anstrengungen in VuePress 2 investiert, das auch Vue 3 und Vite unterstützt und mehr Kompatibilität mit VuePress 1 bietet. Allerdings ist die parallele Pflege von zwei SSGs nicht nachhaltig, so dass das Vue-Team beschlossen hat, sich auf VitePress als die wichtigste empfohlene SSG auf lange Sicht zu konzentrieren.

## Erste Schritte

## Installation

Um mit VitePress zu beginnen, installieren Sie es zunächst mit npm:

```
npm install vitepress --save-dev
```

### Projekt einrichten

Erstellen Sie ein docs-Verzeichnis und fügen Sie ein `docs`-Skript zu `package.json` wie folgt hinzu:

```json
{
  "scripts": {
    "docs": "vitepress dev docs"
  }
}
```

### Grundlegende Konfiguration

VitePress wird mit einem Default-Theme geliefert, das für die technische Dokumentation optimiert ist. Die grundlegende Ordnerstruktur sieht wie folgt aus:

```
docs
├─ .vitepress
│ └─ config.js
└─ index.md
```

Der Einstiegspunkt ist `docs/index.md`. VitePress konvertiert dies automatisch in die Datei "index.html", die im Root-Pfad liegt.

Um das Default-Theme anzupassen, erstellen Sie eine `.vitepress/config.js` und exportieren Sie ein Konfigurationsobjekt:

``js
module.exports = {
  title: 'Meine Docs',
  description: 'Ich spiele nur herum.'
}
```




