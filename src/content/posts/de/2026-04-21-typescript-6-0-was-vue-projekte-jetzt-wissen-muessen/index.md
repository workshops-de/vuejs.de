---
title: "TypeScript 6.0: Was Vue-Projekte jetzt wissen müssen"
description: "TypeScript 6.0: Was Vue-Projekte jetzt wissen müssen"
author: "Robin Böhm"
published_at: 2026-04-21T12:00:00.000Z
categories: "vuejs javascript frontend"
header_source: https://images.unsplash.com/photo-1568716353609-12ddc5c67f04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MTM4MjZ8MHwxfHNlYXJjaHw2fHxUeXBlU2NyaXB0JTIwaXN0JTIwZGElMjBkYXMlMjBUTERSJTIwVHlwZVNjcmlwdCUyMGlzdHxlbnwxfDB8fHwxNzc2NzU3MzYxfDA&ixlib=rb-4.1.0&q=80&w=1080
header_image: https://images.unsplash.com/photo-1568716353609-12ddc5c67f04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MTM4MjZ8MHwxfHNlYXJjaHw2fHxUeXBlU2NyaXB0JTIwaXN0JTIwZGElMjBkYXMlMjBUTERSJTIwVHlwZVNjcmlwdCUyMGlzdHxlbnwxfDB8fHwxNzc2NzU3MzYxfDA&ixlib=rb-4.1.0&q=80&w=1080
---

**TL;DR:** TypeScript 6.0 ist erschienen und bringt eine Reihe von Breaking Changes und neuen Defaults, die Vue 3-, Vite- und Nuxt-Projekte direkt betreffen – insbesondere bei `strict`, `baseUrl`, `types[]` und dem neuen Modul-Default.

TypeScript 6.0 wurde am 23. März 2026 von Daniel Rosenwasser und dem TypeScript-Team veröffentlicht. Das Release ist bewusst als Übergangsversion angelegt: Es bildet die Brücke zu TypeScript 7.0, das auf einem vollständig neu geschriebenen Go-basierten Compiler aufbaut und sich aktuell in der Vorschau befindet. Die meisten Änderungen in 6.0 sind auf Alignment mit 7.0 ausgerichtet – das bedeutet für Vue-Entwickler: Wer jetzt migriert, spart sich doppelten Aufwand später.

## Was ist neu?

Die wichtigsten Änderungen in TypeScript 6.0 betreffen die Defaults und Deprecations der Compiler-Optionen. **`strict` ist jetzt standardmäßig `true`** – wer `"strict": false` benötigt, muss das explizit in der `tsconfig.json` setzen. Das **`module`-Default wechselt auf `esnext`**, was gut zu Vite passt, aber in bestehenden Projekten mit abweichender Konfiguration zu Konflikten führen kann. Ebenfalls neu: **`types[]` ist jetzt standardmäßig leer** statt alle Pakete aus `node_modules/@types` automatisch einzuschließen – viele Vue/Nuxt-Projekte müssen künftig `@types/node` und weitere Pakete explizit deklarieren. Dazu kommt: **`baseUrl` ist deprecated** und wird als Lookup-Root für die Modulauflösung nicht mehr berücksichtigt, was Vite-Path-Aliases über `tsconfig.json` betrifft. `target: es5` ist ebenfalls deprecated, was für die überwiegende Mehrheit moderner Vue-Projekte ohnehin keine Rolle mehr spielt.

Auf der positiven Seite führt TypeScript 6.0 **native Typen für die Temporal API** ein (Stage 4, verfügbar via `--target esnext`), unterstützt **`#/`-Subpath-Imports** unter `--moduleResolution nodenext` und bringt das neue Flag **`--stableTypeOrdering`** für eine deterministischere Typreihenfolge – nützlich für alle, die bereits mit TypeScript 7.0 Preview-Builds testen wollen.

## Was bedeutet das für Vue-3-Projekte?

Für Vue-3-Projekte mit Vite oder Nuxt sind vor allem drei Punkte handlungsrelevant. Erstens müssen Projekte, die bisher auf den `types`-Automatch vertrauten, jetzt `"types": ["node"]` oder ähnliches explizit in die `tsconfig.json` schreiben – andernfalls erscheinen viele Fehler wie „Cannot find name 'process'" oder „Cannot find module 'fs'". Nuxt-Projekte sind davon etwas weniger betroffen, da Nuxt eine eigene `.nuxt/tsconfig.json` generiert, die diese Einträge enthält. Zweitens: Wer `baseUrl` bisher genutzt hat, um Path-Aliases wie `@/components` in der `tsconfig.json` zu definieren, muss diese Pfade explizit in `paths` migrieren – Vite selbst löst Aliases ohnehin über `resolve.alias` in der `vite.config.ts`, das bleibt unberührt. Drittens gilt: Deprecations können per `"ignoreDeprecations": "6.0"` temporär unterdrückt werden, aber TypeScript 7.0 wird diese Optionen vollständig entfernen. Ein frühzeitiger Fix ist die empfohlene Vorgehensweise.

## Quellen & Weiterführende Links

- 📰 [Announcing TypeScript 6.0 – Microsoft DevBlog](https://devblogs.microsoft.com/typescript/announcing-typescript-6-0/)
- 📚 [TypeScript 6.0 Migration Guide (ts5to6 tool)](https://github.com/andrewbranch/ts5to6)
- 📚 [TypeScript Native Port (7.0 Preview)](https://devblogs.microsoft.com/typescript/announcing-typescript-native-previews/)
- 🎓 **Workshops & Kurse**:
  - [Vue.js: Modul 1 – Komponenten, Reaktivität & Schnittstellen](https://workshops.de/seminare-schulungen-kurse/vuejs-modul-1) — TypeScript in Vue-Projekten von Grund auf
  - [Vue.js: Modul 2 – Architektur & Qualität](https://workshops.de/seminare-schulungen-kurse/vuejs-modul-2) — Typsichere Vue-3-Anwendungen auf Produktionsniveau
