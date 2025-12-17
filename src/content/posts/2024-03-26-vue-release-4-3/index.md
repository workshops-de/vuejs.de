---
title: "Vue Release 3.4 - Performance, ein überarbeiteter Parser und optimierter Reaktivität"
description: "Vue.js 3.4 steigert die Leistung: 2x schnelleres Template-Parsing, schnellere SFC-Builds, verbesserte TransitionGroup-, Teleport- und TypeScript-Unterstützung. Lies Evan You's Highlights."
author: "Robin Böhm"
published_at: 2024-03-26T19:30:00.000Z
categories: "vuejs release"
header_image: "header.jpg"
---


Dieses Release enthält einige bedeutende Verbesserungen - insbesondere einen neu geschriebenen Template-Parser, der 2x schneller ist, und ein überarbeitetes Reaktivitätssystem, das das Auslösen von Effekten genauer und effizienter macht. Zudem bietet es eine Reihe von Verbesserungen der API, einschließlich der Stabilisierung von `defineModel` und einer neuen Kurzschreibweise beim Binden von Props. Wir haben natürlich unsere <a target="_blank" href="https://workshops.de/seminare-schulungen-kurse/vuejs-typescript?utm_source=vuejs_de&utm_campaign=tutorial&utm_medium=portal&utm_content=text-top">Vue & TypeScript Intensiv-Schulungen</a> auch direkt auf die neuste Version upgedatet.

## Kurze Übersicht was beim Upgrade zu tun ist

Wenn du auf Vue 3.4 upgradest sind folgende Schritte ggf. notwendig:

- Folgende Dependencies musst du in deinem Projekt ebenfalls updaten falls du auf Vue 4.3. wechselst:

  - Volar / vue-tsc@^1.8.27 (erforderlich)
  - @vitejs/plugin-vue@^5.0.0 (nur bei Verwendung von Vite)
  - nuxt@^3.9.0 (nur bei Verwendung von Nuxt)
  - vue-loader@^17.4.0 (nur bei Verwendung von webpack oder vue-cli)

- Wenn du TypeScript JSX (TSX) mit Vue verwendest, ist der globale JSX-Namespace nicht mehr standardmäßig registriert.hierzu kannst du einfach in der in `tsconfig.json` die Option `jsxImportSource` auf `'vue'` setzen.

- Weiterhin wurden einige deprecated Features nun final entfernt. Ggf. hast du hier ein paar Stellen wo du dies anpassen musst.


Lasst uns mal einen Blick auf die Verbesserungen in diesem Release legen...

## Neuer Template Parser

Vue 3.4 beinhaltet einen brandneuen Template Parser, der von Grund auf neu geschrieben wurde.
Der alte rekursive Descent Parser verließ sich stark auf reguläre Ausdrücke und Lookahead Logik.
Der neue Parser verwendet stattdessen einen State-Machine-Ansatz, der nur einmal durch den Template-String iteriert.

Das Ergebnis ist ein Parser, der über alle Templates hinweg konstant doppelt so schnell ist.
Die Benchmarks zeigen, dass die Parsing-Geschwindigkeit im Vergleich zu Vue 3.3 um 100-200% verbessert wurde.

Darüber hinaus hat die Integration des neuen Parsers in das restliche System Möglichkeiten zur weiteren Optimierung der Single-File-Component (SFC) Build-Performance aufgezeigt.
Die Benchmarks zeigen eine ~44%ige Verbesserung der SFC-Kompiliergeschwindigkeit bei der Generierung von Source Maps.

Was absolut bemerkenswert ist und die Qualität des Projektes unterstreicht: Trotz der signifikanten internen Änderungen ist der neue Parser dank umfangreicher Tests und der Validierung durch ecosystem-ci 100% abwärtskompatibel. Du kannst also getrost auf 3.4 upgraden, da alle Templates weiterhin ohne Änderungen funktionieren werden. Der neue Parser legtdamit  den Grundstein für schnelleres Tooling im gesamten Vue-Ökosystem.

## Optimierte Reaktivität

Das Reaktivitätssystem in Vue 3.4 wurde optimiert, um effizienter zu sein und unnötige Re-Renderings zu vermeiden. Hier sind einige der wichtigsten Verbesserungen:

### Effizienteres Computed Tracking

Berechnete Eigenschaften werden jetzt nur noch dann neu ausgewertet, wenn sich das berechnete Ergebnis tatsächlich geändert hat. Zum Beispiel:

```js
const count = ref(0)
const isEven = computed(() => count.value % 2 === 0)

watchEffect(() => console.log(isEven.value)) // logs true

count.value = 2 // logs true again
```

Selbst wenn sich `count` mehrfach ändert, wird `isEven` nur dann neu ausgewertet, wenn die Modulo-Prüfung ein anderes Ergebnis liefert.

Vor 3.4 würde der Callback von `watchEffect` jedes Mal ausgelöst werden, wenn `count.value` geändert wird, selbst wenn das Ergebnis von `computed` gleich bleibt.
Mit den Optimierungen nach 3.4 wird der Callback jetzt nur ausgelöst, wenn sich das berechnete Ergebnis tatsächlich geändert hat.

### Unnötige Re-render werden reduziert

Vue ist nun noch besser darin, keine Re-Renderings auszulösen, wenn mehrere Abhängigkeiten einer berechneten Eigenschaft in einem einzigen Flush geändert werden.

Array-Mutations-Methoden wie `push`, `pop`, `shift`, etc. lösen ebenfalls nur noch einmal Re-Renderings aus, anstatt mehrmals pro Mutation.

## Neue Features

### `defineModel` ist jetzt stable

Das `defineModel` Makro, das in Vue 3.3 als experimentelles Feature eingeführt wurde, hat nun in Vue 3.4 den stabilen Status erreicht.
`defineModel` zielt darauf ab, die Implementierung von Komponenten zu vereinfachen, die `v-model` in `<script setup>` unterstützen.
Es bietet nun auch bessere Unterstützung für die Verwendung mit `v-model` Modifikatoren.

Siehe hierzu auch:

- [Revised Component v-model section](https://vuejs.org/guide/components/v-model.html)
- [defineModel API-Referenz](https://vuejs.org/api/sfc-script-setup.html#definemodel)

### `v-bind` Shorthand

Endlich können wir jetzt auch Abkürzungen für "v-bind" verwenden, anstatt den Attribut-Namen immer wieder zu wiederholen. Ein Beispiel:

Vorher:
```html
<img :id="id" :src="src" :alt="alt">
```

Seit Vue 3.4:

```html
<img :id :src :alt>
```

### Verbesserte Hydration Fehlermeldungen

Vue 3.4 bringt mehrere Verbesserungen bei Hydrations-Mismatch-Fehlern:

- Klarere Formulierungen wie "rendered by server vs. expected on client"
- Enthält jetzt den DOM-Knoten für schnelles Debugging
- Überprüft auch class, style und andere dynamische Attribute

## Fazit

Vue 3.4 enthält einige wichtige Verbesserungen, für die sich ein Upgrade lohnt. Der neu geschriebene Template-Parser beschleunigt die Kompilierung erheblich, und das optimierte Reaktivitätssystem reduziert unnötige Komponenten-Renderings.

Zusätzliche Qualitätsverbesserungen wie das v-bind Shorthand und das stabilisierte defineModel Makro machen das Erstellen von Vue Anwendungen noch angenehmer.

Insgesamt ist Vue 3.4 ein schöner Schritt nach vorne für das Framework. Für Benutzer, die noch Vue 2 verwenden, ist es ein guter Zeitpunkt, um zu aktualisieren und die Vorteile aller Verbesserungen in Vue 3 zu nutzen. Falls du schneller und tiefer in das Thema einsteigen willst schau dir doch einmal unsere <a target="_blank" href="https://workshops.de/seminare-schulungen-kurse/vuejs-typescript?utm_source=vuejs_de&utm_campaign=tutorial&utm_medium=portal&utm_content=text-top">Vue & TypeScript Intensiv-Schulungen</a> an.

Eine vollständige Liste der Änderungen findest du im [Changelog auf GitHub](https://github.com/vuejs/core/blob/main/CHANGELOG.md#340-2023-12-28). Ein Update auf Vue 3.4 ist auf jeden Fall gut investierte Zeit ist!

