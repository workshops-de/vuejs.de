---
title: "Nuxt 3.15: Alle Neuerungen und Highlights des Updates im Überblick"
description: "Entdecke die neuen Funktionen von Nuxt 3.15: Vite 6, Hot Module Replacement, verbesserte DevTools und Leistungsoptimierungen. Jetzt mehr über das Update erfahren!"
author: "Antony Konstantinidis"
published_at: 2025-01-20T14:00:00.000Z
header_source:
header_image: header.jpg
categories: "nuxt release"
---

Am 24. Dezember 2024 wurde Nuxt Version 3.15 veröffentlicht, die mehrere erwähnenswerte Verbesserungen und neue Funktionen einführt.

## Integration von Vite 6

Nuxt 3.15 integriert erstmals Vite 6. Obwohl es sich um ein Major-Update handelt, sollten keine Kompatibilitätsprobleme für Nuxt-Nutzer auftreten. Dennoch ist Vorsicht geboten, wenn Abhängigkeiten eine spezifische Vite-Version erfordern. Eine der bedeutendsten Neuerungen in Vite 6 ist die Einführung der Environment API, die in Kombination mit Nitro die Server-Entwicklungsumgebung verbessern soll.

Mehr Informationen dazu gibt es [hier](https://vite.dev/blog/announcing-vite6).

## Verbesserungen der Chromium DevTools

Die Integration der Nuxt DevTools in Chromium-basierte Browser wurde optimiert. Durch die Nutzung der Chrome DevTools Extensibility API können nun Nuxt-Hook-Timings im Performance-Panel der Browser-DevTools angezeigt werden.

## Navigationsmodus für callOnce

Das `callOnce`-Composable ermöglicht das einmalige Ausführen von Code. Mit der neuen Option `mode: 'navigation'` kann der Code nun nur einmalig pro Navigation ausgeführt werden, wodurch die doppelte Ausführung auf Server und Client vermieden wird.

```ts
await callOnce(() => counter.value++, { mode: 'navigation' })
```

## Hot Module Replacement (HMR) für Templates und Seiten

Nuxt 3.15 implementiert HMR für virtuelle Dateien wie Routen, Plugins und generierte Dateien sowie für Seiten-Metadaten innerhalb des `definePageMeta`-Makros. Dies führt zu einer schnelleren Entwicklungserfahrung, da Seiten bei Routenänderungen nicht neu geladen werden müssen.

## Erweiterungen der Seiten-Metadaten

Es wird nun die Extraktion zusätzlicher Seiten-Metadaten-Schlüssel über `experimental.extraPageMetaExtractionKeys` unterstützt, was insbesondere für Modulautoren nützlich ist. Zudem können lokale Funktionen in `definePageMeta` verwendet werden, um beispielsweise Routenparameter zu validieren.

```ts
function validateIdParam(route) {
  return !!(route.params.id && !isNaN(Number(route.params.id)))
}

definePageMeta({
  validate: validateIdParam,
})
```

## Leistungsverbesserungen

Das App-Manifest wird im Browser vorab geladen, wenn es beim Hydrieren der Anwendung verwendet wird. Zudem werden nicht benötigte Teile des vue-router, wie der Hash-Modus, aus dem Bundle entfernt, sofern keine Anpassungen in `app/router.options.ts` vorgenommen wurden.
