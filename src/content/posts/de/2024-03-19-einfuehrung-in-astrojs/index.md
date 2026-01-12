---
title: "Was ist Astro? Die nächste Generation von statischen Site-Generatoren"
description: "Entdecken Sie Astro, das JavaScript-Framework für schnelle statische Seiten. Funktionen, Vorteile und Anwendungsmöglichkeiten."
author: "Robin Böhm"
published_at: 2024-03-19T19:30:00.000Z
categories: "astro tooling development"
header_image: "header.jpg"
---

Astro ist ein Open-Source Web-Framework, das ursprünglich als statischer Site-Generator (SSG) begann. Obwohl es jetzt andere Rendering-Methoden unterstützt, liegt seine Hauptstärke in der Funktion als SSG.

Einige Schlüsselfunktionen von Astro:

- **UI-agnostisch**: Ein großer Vorteil von Astro im Vergleich zu anderen SSGs ist, dass es UI-agnostisch ist. Das bedeutet, Sie können ein Astro-Projekt mit Ihren bevorzugten Frameworks wie React, Preact, Svelte, Vue, Solid, Lit und AlpineJS erstellen.

- **Außergewöhnliche Leistung**: Dank seines Ansatzes ohne JavaScript und der Island-Architektur bietet Astro auch extrem schnelle Seitenladezeiten.

- **Anpassbar**: Astro nutzt intern Vite, was bedeutet, dass auch Vite-spezifische Build-Optionen verfügbar sind. Darüber hinaus hat Astro seine eigene API für den Bau von Integrationen. Es gibt bereits mehr als 100 Integrationen zur Auswahl.

- **Einfach zu deployen**: Dank seines reichen Ökosystems kommt es mit vielen Integrationen, um Ihre Site mit Leichtigkeit in die Cloud zu deployen.

## Vorteile von Astro

Astro bietet viele Vorteile im Vergleich zu traditionellen statischen Site-Generatoren:

**Schnellere Seitenladezeiten**

Dank Astros Ansatz ohne JavaScript laden Seiten unglaublich schnell. Astro entfernt jedes unnötige JavaScript auf Seiten, wo Interaktivität nicht benötigt wird. Dies führt zu einem viel geringeren Seitengewicht und schnelleren Ladezeiten im Vergleich zu anderen beliebten SSGs.

**Framework-Agnostisch**

Astro ist vollständig framework-agnostisch, was bedeutet, dass Sie Astro-Sites mit jedem großen JavaScript-UI-Framework wie React, Vue, Svelte usw. bauen können. Es ist nicht notwendig, bestehenden Code umzuschreiben - Integrationen erlauben es, Komponenten aus anderen Frameworks nahtlos einzubinden.

**Granulare Kontrolle über Islands**

Astro führt das Konzept der "Islands" ein - interaktive Komponenten, die selektiv auf dem Client hydratisiert werden können. Dies ermöglicht eine granulare Kontrolle darüber, welche Teile einer Seite Interaktivität benötigen. Islands geben Entwicklern vollständige Macht darüber, welches JavaScript an den Client geliefert wird.

**Einfaches Deployment**

Astro kommt mit offiziellen Adaptern für Dienste wie Netlify, Vercel, Cloudflare Pages und mehr. Diese Adapter machen das Deployment nahtlos. Installieren Sie einfach den Adapter, konfigurieren Sie ihn und deployen Sie sofort auf führenden Plattformen.

## Einrichtung und Projektstruktur

Um mit Astro zu beginnen, müssen Sie ein neues Projekt mit einem der folgenden Befehle bootstrapen:


```cmd
// Mit NPM
npm create astro@latest

// Mit Yarn
yarn create astro

// Mit PNPM
pnpm create astro
```


Dies wird Sie auffordern, das `create-astro` CLI-Tool zu installieren, falls Sie es noch nicht installiert haben.

Einmal installiert, werden Sie aufgefordert, den Projektnamen festzulegen. Akzeptieren Sie die Standardeinstellungen, um ein Starter-Astro-Projekt mit der empfohlenen Konfiguration zu generieren.

Die generierte Projektstruktur sieht wie folgt aus:


```
public/
src/
components/
layouts/
pages/
astro.config.mjs
```


- `public/` - Statische Assets wie Bilder kommen hierher. Dateien werden direkt in den Build-Output kopiert.

- `src/` - Enthält alle Astro-Komponenten, Layouts, Seiten.

  - `components/` - Wiederverwendbare Komponenten kommen hierher.

  - `layouts/` - Layout-Komponenten für Seiten.

  - `pages/` - Astro-Seiten verwenden routing basierend auf Dateien. `src/pages/index.astro` verweist auf die Wurzel.

- `astro.config.mjs` - Astros Konfigurationsdatei.

Diese Dateistruktur bietet eine saubere Möglichkeit, Komponenten, Layouts, Seiten und Assets innerhalb eines Astro-Projekts zu organisieren.

## Frameworks in Astro verwenden

Astro bietet offizielle Unterstützung um beliebte Frameworks wie React, Vue, Svelte usw. hinzuzufügen.

Um ein Framework hinzuzufügen, führen Sie einen der folgenden Befehle aus:

```cmd
// Vue
npx astro add vue

// React
npx astro add react

// Svelte
npx astro add svelte
```

Mit diesem Befehl werden folgende Prozesse angestoßen:

1. Notwendige Abhängigkeiten installieren (z.B. vue)
2. Astros Konfigurationsdatei mit dem Framework als Abhängigkeit aktualisieren
3. TypeScript-Konfiguration bei Bedarf aktualisieren

Für die Unterstützung von Vue wird die Konfiguration z.B. um folgendes erweitert:

```js
// astro.config.mjs
import vue from '@astrojs/vue';

export default {
  // ...
  integrations: [vue()]
}
```

Nun können wir Vue-Komponenten normal in Astro importieren und verwenden:

```vue
// Component.vue
<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <button @click="count++">You clicked me {{ count }} times.</button>
</template>


// page.astro
---
import Component from './Component.vue';
---
```

## Hydration: Die Astro Island Architektur

In der Webentwicklung, speziell im Kontext von JavaScript-Frameworks oder Bibliotheken wie React, Vue oder Astro, bezieht sich der Begriff "hydratisieren" auf den Prozess, bei dem ein initial vom Server gerendertes HTML-Dokument anschließend auf dem Client (im Browser) mit interaktiven Funktionen "belebt" oder angereichert wird. Dies geschieht, indem eventuell vorhandenes statisches HTML mit den entsprechenden JavaScript-Event-Handlern und weiterem dynamischen Verhalten verbunden wird, das Interaktionen auf der Webseite ermöglicht.

Bei serverseitigem Rendering (SSR) wird eine Webseite auf dem Server in HTML umgewandelt und an den Browser gesendet, bevor jegliches JavaScript ausgeführt wird. Das "Hydratisieren" ist dann der Schritt, bei dem das JavaScript im Browser ausgeführt wird, um die statische Seite in eine vollständig interaktive Anwendung zu verwandeln. Dies ermöglicht eine schnellere erste Darstellung der Seite, da der Benutzer den initialen Inhalt sehen kann, bevor alle JavaScript-Bundles vollständig geladen und ausgeführt sind.

Interaktive Komponenten in Astro werden in speziellen Direktiven, den sogenannten "Client-Direktiven", eingewickelt. Diese Direktiven weisen Astro an, die Komponente mit dem notwendigen JavaScript zu hydratisieren, um sie interaktiv zu machen.

Komponenten, die in Client-Direktiven eingewickelt sind, werden "Astro Islands" genannt. Dieser Ansatz ermöglicht eine granulare Kontrolle über die Interaktivität in Astro.

Einige häufig verwendete Client-Direktiven sind:

- `client:load` - Hydratisiert die Komponente beim Seitenladen. Nützlich für kritische "above-the-fold"-Komponenten.

- `client:idle` - Hydratisiert nach dem ersten Laden während der Leerlaufzeit des Browsers. Für nicht kritische Komponenten.

- `client:visible` - Hydratisiert, wenn die Komponente im Viewport sichtbar ist. Verwendet IntersectionObserver.

- `client:media` - Bedingt hydratisiert basierend auf Media Queries. Z.B.: wenn die Bildschirmgröße Tablet und größer ist.

Die verschiedenen Prioritätsstufen ermöglichen eine feinkörnige Kontrolle darüber, wann und wie Komponenten hydratisiert werden. Astro handhabt alle schwierigen Teile intern, was es leicht macht, Komponenten als interaktive Islands zu designieren.

Dieser selektive Hydratisierungsansatz hat mehrere Vorteile:

- Verbessert die Leistung, indem nur das notwendige JavaScript geladen wird
- Kontrolliert Priorität und Ladeordnung
- Visuelle Trennung von statischen und interaktiven Elementen

Insgesamt ermöglichen Astro Islands das Bauen von Apps mit großartiger UX, indem das minimal notwendige JavaScript für Interaktivität geladen wird.

## Anpassen von Builds durch Vite

Astro-Projekte laufen unter der Haube auf Vite, was bedeutet, dass alle Konfigurationsoptionen von Vite verwendet werden können, um Ihren Astro-Build anzupassen.

Einige nützliche Konfigurationsoptionen umfassen:

- `site` - Die vollständige URL für Ihr Projekt. Dies hilft Astro, eine Sitemap zu generieren.

- `outDir` - Das Ausgabeverzeichnis für den Build. Standardmäßig ist dies `dist`, aber Sie können es in etwas wie `build` ändern.

- `integrations` - Integrationen fügen Astro-Projekten zusätzliche Funktionalität hinzu. Einige nützliche sind:

  - `sitemap` - Generiert eine Sitemap, um Suchmaschinen das Crawlen Ihrer Site zu erleichtern.

  - `compress` - Komprimiert Ausgabedateien wie HTML, CSS, JS und Bilder, um die Leistung zu verbessern.

Um Integrationen hinzuzufügen, installieren Sie sie zuerst von npm:

```cmd
npm install astro-sitemap
npm install astro-compress
```


Dann importieren Sie sie und fügen Sie sie zum `integrations`-Array in `astro.config.mjs` hinzu:

```js
import { defineConfig } from 'astro/config';
import sitemap from 'astro-sitemap';
import compress from 'astro-compress';

export default defineConfig({
  // ...
  integrations: [sitemap(), compress()]
});
```

Integrationen können auch konfiguriert werden, indem Optionen übergeben werden, wie das Beschränken von compress nur auf Bilder und SVGs:

```js
compress({
  css: false,
  html: false,
  image: true,
  js: false,
  svg: true
})
```

## Deployment mit Adaptern

Astro wird mit offiziellen Adaptern für beliebte Dienste wie Netlify, Vercel, Cloudflare Pages, Deno Deploy und mehr geliefert. Diese Adapter übernehmen die notwendige Konfiguration und Einrichtung, die benötigt wird, um Astro-Projekte mit serverseitigem Rendering zu deployen.

Um beispielsweise ein Astro-Projekt auf Netlify mit SSR zu deployen, müssen wir zuerst den Netlify-Adapter installieren:

```cmd
npx astro add netlify
```


Dies wird das `astro-netlify` Paket installieren und den Adapter zu `astro.config.mjs` hinzufügen.

Dann müssen wir `output` auf `server` in der Konfigurationsdatei setzen und den `netlify` Adapter spezifizieren:

```js
export default defineConfig({
  // ...
  output: "server",
  adapter: netlify()
});
```

Wenn wir jetzt zu Netlify deployen, wird es automatisch SSR erkennen und mit dem Adapter bauen. Keine zusätzliche Konfiguration benötigt!

Die offiziellen Adapter nehmen den Aufwand, serverseitiges Rendering auf verschiedenen Plattformen einzurichten, weg. Wir können ein Astro-Projekt innerhalb von Minuten deployen und Seiten durch SSR ausliefern lassen.

Die Migration zwischen verschiedenen Diensten ist ebenfalls nahtlos. Um von Netlify zu Vercel zu wechseln, installieren wir einfach stattdessen den Vercel-Adapter und deployen neu. Die Adapter abstrahieren dienstspezifische Konfigurationen und Details.

So machen Astros Adapter Deployments unglaublich einfach. Sie ermöglichen reibungslose Migrationen zwischen Diensten, während sie automatisch die gesamte SSR-Konfiguration für uns übernehmen.


## Zusätzliche Ressourcen

Um tiefer einzutauchen, schauen Sie sich diese zusätzlichen Astro-Ressourcen an:

- [Astro Dokumentation](https://docs.astro.build/) - Astros offizielle Dokumentation deckt alles ab, vom Einstieg bis zu fortgeschrittenen Funktionen. Es ist die beste Ressource, um Astro zu lernen.

- [Astro GitHub Repo](https://github.com/withastro/astro) - Durchsuchen Sie Astros Quellcode, öffnen Sie Issues und tragen Sie auf GitHub bei.

- [Astro Discord](https://discord.gg/astrodotbuild) - Treten Sie der Astro-Community auf Discord bei, um Fragen zu stellen, Hilfe zu bekommen und Best Practices zu diskutieren. Mit über 30.000 Mitgliedern ist es ein großartiger Ort, um sich zu verbinden.

Die Astro-Dokumente bieten umfassende Anleitungen und API-Referenzen. Das Studium von realen Astro-Projekten auf GitHub ist eine großartige Möglichkeit zu lernen. Und die Discord-Community bietet Unterstützung, während Sie mit dem Bauen mit Astro beginnen.

## Fazit

Mit seinen vielen Vorteilen und der blühenden Community ist Astro eine großartige Option, die Sie für Ihr nächstes Projekt in Betracht ziehen sollten. Es kann helfen, Seiten unglaublich schnell zu erstellen und gleichzeitig Flexibilität durch seine umfangreichen Integrationen zu ermöglichen.

Zusammenfassend bietet Astro viele Vorteile als statischer Site-Generator:

- **UI-Agnostisch**: Ermöglicht die Verwendung jedes großen JavaScript-Frameworks wie React, Preact, Svelte usw. Keine Notwendigkeit, bestehende Komponenten umzuschreiben.

- **Rasend schnelle Leistung**: Die Erzeugung von echtem statischen HTML führt zu unglaublich schnellen Seitenladezeiten.

- **Einfache Anpassung**: Nutzt Vite unter der Haube, sodass alle Vite-Build-Anpassungen verfügbar sind. Viele Integrationen ermöglichen eine weitere Anpassung.

- **Vereinfachtes Deployment**: Kommt mit eingebauten Adaptern für beliebte Dienste wie Netlify, Vercel, Cloudflare Pages usw. für sofortiges Deployment.

- **Blühendes Ökosystem**: Aktive Gemeinschaft mit über 100+ Integrationen und Add-ons verfügbar.

- **Intuitive Entwicklung**: Dateibasiertes Routing, einfache Importe und Astro Islands machen die Entwicklung intuitiv.

- **SEO-Optimiert**: Die integrierte Sitemap-Erstellung und die Möglichkeit zum SSR helfen, SEO-freundliche Seiten zu erstellen.