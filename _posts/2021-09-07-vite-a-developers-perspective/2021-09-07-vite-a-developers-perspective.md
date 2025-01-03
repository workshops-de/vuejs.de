---
title: "Vite – a developer's perspective"
description: "Das Development und Build Tool Vite bietet mit Release 2 noch mehr Features und Vorteile als die Vorgängerversion. Wir haben uns angeschaut, was Vite alles zu bieten hat."
author: "Antony Konstantinidis"
published_at: 2021-09-07 07:30:00.000000Z
categories: "vuejs tooling development"
tutorial_page_order: '1'
---

Vite [vit] steht mittlerweile in Version 2.5.3 zur Verfügung und stammt von dem bekannten Vue Entwickler Evan You. Dieser wollte mit dem Tool für mehr Geschwindigkeit und Entwicklungskomfort sorgen, was er auch tatsächlich geschafft hat.

Als Development-Server und Build Tool soll Vite künftig die JavaScript-Entwickler unterstützen. Hierfür werden die nativen ES-Module des Browsers genutzt sowie Werkzeuge wie `esbuild` zum Kompilieren von TypeScript in JavaScript. Das Versprechen: Allein durch `esbuild` soll das Pre-Bundling um das 10- bis 100-fache beschleunigt werden.

Klingt super? Ein guter Grund, sich mit Vite etwas näher zu beschäftigen.

## NPM und Pre-Bundling mit Vite

Vite erkennt Modul-Importe in Sourcedateien und analyisiert diese anhand des Pfads. Handelt es sich um NPM-Module, werden diese vorgebündelt und gecached, da die Wahrscheinlichkeit von Änderungen in diesen Dateien extrem gering ist. Dadurch wird der Kompiliervorgang bereits um ein Vielfaches beschleunigt. Zusätzlich werden [CommonJS](https://nodejs.org/docs/latest/api/modules.html){:target="_blank"}-/UMD-Module in ESM konvertiert. Es ist so also möglich, von jedem beliebigen NPM-Modul, die gewohnte `import`-[Syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import){:target="_blank"} zu verwenden. Der Pre-Bundling-Vorgang wird dabei mit [esbuild](https://esbuild.github.io){:target="_blank"} durchgeführt, was die Startzeit von Vite extrem beschleunigt – im Vergleich zu anderen JavaScript-basierten Bundlern.

Vor allem beim Kaltstart eines Dev-Servers muss ein Bundler zuerst alle Abhängigkeiten durchforsten und aufbauen. Vite verkürzt die Startzeit des Dev-Servers, indem es die Module in zwei Kategorien separiert: Abhängigkeiten (Dependencies) und Sourcecode.

Abhängigkeiten – wie z. B. Komponentenbibliotheken – ändern sich oft nicht in der Entwicklung, sind aber aufwändig in der Bereitstellung. Diese können einfach mit dem bereits genannten `esbuild` vorgebündelt werden, um wichtige Zeit zu sparen: [Pre-Bundling](https://vite.dev/guide/dep-pre-bundling.html){:target="_blank"}.

**Das Besondere**: Das Bundling geschieht anschließend mit Rollup. Warum hierfür nicht auch `esbuild` genommen wurde? Leider sind einige der wichtigen Funktionen, die für die Bündelung von Anwendungen benötigt werden, noch nicht ausgereift – insbesondere das Code-Splitting und die CSS-Handhabung. Zusätzlich fand Evan You, dass Rollup bessere Zukunftsaussichten hat, als z. B. webpack. So verwendet Rollup bereits das neue standardisierte Format für Code-Module: [ES Modules](https://rollupjs.org/guide/en/#es-module-syntax){:target="_blank"}.

Dank der Standardisierung der ES-Module durch das ECMA-Komitee, gelten diese zudem als zukunftsweisend. Damit die Kompatibilität für die Abhängigkeiten in einem Vite-Projekt aber sichergestellt wird, müssen diese vorher angepasst werden.
Neben den Abhängigkeiten, die keine ES-Module exportieren, werden auch die optimiert, deren Einstiegspunkte import Anweisungen in tieferliegende Module oder andere Abhängigkeiten beinhalten.
Wichtig: Um Zeit zu sparen, werden diese Optimierungen von Vite nur bei einer veränderten `package.json`- oder `package-lock.json`-Datei ausgeführt.

**Ein weiterer Vorteil**: Damit Browser nicht Dateien einzeln abfragen, kann Vite unabhängige Einstiegspunkte finden und dabei den Code splitten. So werden z. B. JavaScript-Module, die später gebraucht werden, auch erst später geladen. Die Module werden sozusagen on demand von Vite geparst und kompiliert.

## Hot Module Replacement (HMR)

Der neue Aufbau eines Bundles ist zeitaufwändig und ressourcen-intensiv. Zudem kann das Neuladen der Seite aktuelle Parameter verändern. Aus diesem Grund unterstützt auch Vite das Hot Module Replacement (HMR). Dadurch lässt sich ein Modul während des Anwendungsvorgangs neu laden, ohne die Seite zu beeinflussen.

Vite bietet eine [HMR-API](https://vite.dev/guide/api-hmr.html){:target="_blank"} über native ES-Module. Frameworks mit HMR-Funktionen können die API nutzen, um einzelne Module anzupassen, ohne die Seite erneut laden zu müssen. Vite bietet HMR-Integrationen für [Vue Single File Components](https://github.com/vitejs/vite/tree/main/packages/plugin-vue){:target="_blank"} und [React Fast Refresh](https://github.com/vitejs/vite/tree/main/packages/plugin-react-refresh){:target="_blank"} an.

**Gut zu wissen**: Ihr müsst HMR nicht manuell einrichten, wenn Ihr eine App über `create vite` erstellt, da diese bereits vorkonfiguriert sind.

## Support für TypeScript, Vue und JSX

Vite unterstützt grundlegend den Import von `.ts`-Dateien. Dabei führt das Tool nur die Konvertierung von .ts-Dateien durch, aber keine Typüberprüfung. Es wird angenommen, dass die Typprüfung bereits von der IDE und dem Build-Prozess übernommen wird.

**Tipp**: Ihr könnt

```bash
tsc --noEmit
```

im Build-Skript ausführen oder `vue-tsc` installieren und

```bash
vue-tsc --noEmit
```

ausführen, um Eure Vue-Dateien zu prüfen.

**Das Beste**: Vite verwendet `esbuild`, um TypeScript in JavaScript zu kompilieren. Dadurch wird der Build-Prozess um das 20 bis 30-fache schneller als mit `tsc`. Zudem können HMR-Updates im Browser in unter 50ms reagieren.
Allerdings kann `esbuild` zu ein paar Sprachproblemen führen. Wie Ihr diese beseitigt, erfahrt Ihr auf dieser [esbuild Seite](https://esbuild.github.io/content-types/#typescript){:target="_blank"}.

### Vue Support
Natürlich hat Evan You auch dafür gesorgt, dass Vue ausreichend unterstützt wird. Erstklassigen Vue Support erhaltet Ihr zum Beispiel hier:

- Vue 3 SFC Support über [@vitejs/plugin-vue](https://www.npmjs.com/package/@vitejs/plugin-vue){:target="_blank"}
- Vue 2 Support über [underfin/vite-plugin-vue2](https://github.com/underfin/vite-plugin-vue2){:target="_blank"}

#### JSX Support
`.jsx`- und `.tsx`-Dateien werden ebenfalls unterstützt. Die Kompilierung von JSX wird über `esbuild` durchgeführt sowie standardmäßig auf React 16. Unterstützung für React 17 in `esbuild` erhaltet Ihr auf [Github](https://github.com/evanw/esbuild/issues/334){:target="_blank"}.

Vue Benutzer sollten am besten das offizielle [@vitejs/plugin-vue-jsx](https://www.npmjs.com/package/@vitejs/plugin-vue-jsx){:target="_blank"}-Plugin verwenden, das Vue 3 Funktionen wie HMR, globale Komponentenauflösung, Direktiven und Slots bietet. Weitere Einzelheiten findet Ihr übrigens auch in der [esbuild-Dokumentation](https://esbuild.github.io/content-types/#jsx){:target="_blank"}.

## CSS-Import

Beim Importieren von `.css`-Dateien wird der Inhalt über das `<style>`-Tag mit HMR-Unterstützung in die Seite eingefügt. Ihr könnt das verarbeitete CSS auch als String im Standard-Export des Moduls abfragen.

Vite ist vorkonfiguriert, um CSS `@import` Inlining über `postcss-import` zu unterstützen. Konfigurierte Vite-Aliase werden dabei auch für CSS `@import`-Anweisungen akzeptiert. Zusätzlich werden alle CSS `url()`-Referenzen automatisch angepasst, um zu gewährleisten, dass sie stets korrekt sind.

**Gut zu wissen**: `@import`-Aliase und URL-Anpassungen werden auch für Sass- und Less-Dateien unterstützt (siehe [CSS-Präprozessoren](https://vite.dev/guide/features.html#css-pre-processors){:target="_blank"}).

## Importieren von statischen Assets

Beim Importieren eines statischen Assets wird die freigegebene URL zurückgegeben, sobald sie bereitgestellt wird:

```javascript
import imgUrl from './img.png';
document.getElementById('hero-img').src = imgUrl;
```

Spezielle Importe können die Art und Weise, wie Assets geladen werden, verändern:

```javascript
// Explicitly load assets as URL
import assetAsURL from './asset.js?url';
// Load assets as strings
import assetAsString from './shader.glsl?raw';
// Load Web Workers
import Worker from './worker.js?worker';
// Web Workers inlined as base64 strings at build time
import InlineWorker from './worker.js?worker&inline';
```

`JSON`-Dokumente können direkt importiert werden – selbst named imports:

```javascript
// import the entire object
import json from './example.json';
// import a root field as named exports - helps with treeshaking!
import { field } from './example.json';
```

Mehr dazu findet Ihr in der Dokumentation auch im Bereich [Static Asset Handling](https://vite.dev/guide/assets.html){:target="_blank"}.

## Glob Import und WebAssembly

Vite unterstützt den Import mehrerer Module aus dem Dateisystem – und zwar über die spezielle Funktion `import.meta.glob`:

```javascript
const modules = import.meta.glob('./dir/*.js');
```

Der oben aufgeführte Beispiel-Code wird folgendermaßen umgesetzt und interpretiert:

```javascript
const modules = {
  './dir/foo.js': () => import('./dir/foo.js'),
  './dir/bar.js': () => import('./dir/bar.js')
};
```

Ihr könnt dann über die Keys des Modul-Objekts iterieren, um die dazugehörigen Module aufzurufen:

```javascript
for (const path in modules) {
  modules[path]().then((mod) => {
    console.log(path, mod);
  });
}
```

Passende Dateien werden standardmäßig über den dynamischen Import via Lazy Load geladen. Während des Builds werden sie zudem in einzelne Teile gesplittet.

Wenn Ihr lieber alle Module direkt importieren möchtet, nutzt Ihr besser die Funktion `import.meta.globEager`:

```javascript
const modules = import.meta.globEager('./dir/*.js');
```

Dieser Beispiel-Code wird dabei folgendermaßen umgesetzt:

```javascript
import * as __glob__0_0 from './dir/foo.js'
import * as __glob__0_1 from './dir/bar.js'

const modules = {
  './dir/foo.js': __glob__0_0,
  './dir/bar.js': __glob__0_1
};
```

Achtet aber darauf, dass diese Funkion Vite-spezifisch ist und keinem Web- oder ES-Standard entspricht. Die Glob-Muster werden dabei wie Import-Bezeichner behandelt. Sie müssen deshalb relativ sein (mit `./` beginnen) oder absolut sein (mit `/`, und relativ zum Projektstamm).

Das Glob Matching erfolgt übrigens über [fast-glob](https://github.com/mrmlnc/fast-glob){:target="_blank"}. Am besten lest Ihr Euch zusätzlich in die [Dokumentation zur Pattern Syntax](https://github.com/mrmlnc/fast-glob#pattern-syntax){:target="_blank"} ein.

## WebAssembly

Vorkompilierte `.wasm`-Dateien können direkt importiert werden. Der Standard-Export wird dabei als Initialisierungsfunktion durchgeführt, die einen `Promise` des Export-Objekts der `wasm`-Instanz zurückgibt:

```javascript
import init from './example.wasm';

init().then((exports) => {
  exports.test();
});
```

Die `init`-Funktion kann auch das Import-Objekt enthalten, das an `WebAssembly.instantiate` als zweites Argument weitergegeben wird:

```javascript
init({
  imports: {
    someFunc: () => {
      /* ... */
    },
  },
}).then(() => {
  /* ... */
})
```

Im Produktions-Build werden `.wasm`-Dateien, die kleiner als das `assetInlineLimit` sind, als `base64`-Strings inline eingefügt. Ansonsten werden sie als Asset in das `dist`-Verzeichnis kopiert und bei Bedarf abgerufen.

## WebWorkers Scripts

Ein Webworker-Skript kann direkt importiert werden, indem man `?worker` oder `?sharedworker` an die Importanfrage anhängt. Der Standard-Export wird dann zu einem spezieller Worker-Constructor:

```javascript
import MyWorker from './worker?worker';

const worker = new MyWorker();
```

Das Worker-Script kann auch Import-Anweisungen anstelle von `importScripts()` verwenden. Dabei solltet Ihr aber beachten, dass dies während der Entwicklung von der nativen Unterstützung des Browsers abhängt und derzeit nur in Chrome funktioniert, aber für den Produktions-Build wegkompiliert wird.

Standardmäßig wird das Worker-Skript als separater Chunk im Produktions-Build erstellt. Wenn Ihr das Worker-Skript als `base64`-Strings inline einbinden möchtet, müsst Ihr folgende Import-Anweisung verwenden:

```javascript
import MyWorker from './worker?worker&inline';
```

## Die verschiedenen Build-Optimierungen

Vite extrahiert automatisch das CSS, das von den Modulen in einem asynchronen Chunk verwendet wird. Dabei wird eine separate Datei generiert. Diese CSS-Datei wird automatisch über einen `<link>`-Tag geladen, sobald der dazugehörige asynchrone Chunk geladen wird.

**Das Besondere**: Der asynchrone Chunk wird tatsächlich erst dann verarbeitet, nachdem das CSS geladen wurde. Dadurch soll [Flash of unstyled content](https://web.dev/critical-rendering-path-render-blocking-css/){:target="_blank"} (FOUC) vermieden werden.

Wenn Ihr das gesamte CSS lieber in einer einzigen Datei extrahiert haben möchtet, könnt Ihr die Aufteilung des CSS deaktivieren, indem Ihr `build.cssCodeSplit` auf `false` setzt.

Neben der CSS-Extrahierung generiert Vite übrigens auch automatisch `<link rel="modulepreload">` Angaben für Entry Chunks und ihre dazugehörigen Importe in das HTML.

In realen Anwendungen generiert Rollup oft „allgemeine" Chunks, welche von zwei oder mehreren anderen Modulen gemeinsam genutzt wird. In Kombination mit dynamischen Importen kommt es häufig zu dem Szenario, dass ein Browser einen asynchronen Chunk erst importieren, anfordern und parsen muss, bis er herausfindet, dass dieser den allgemeinen Chunk benötigt.

Deshalb schreibt Vite diese Importketten automatisch um, so dass, gleichzeitig zum angefragten Chunk weitere benötigte Chunks geladen werden können. Die Optimierung durch Vite verfolgt alle direkten Importe, um die störenden Roundtrips zu beseitigen, ganz gleich, wie tiefgehend die Importe dabei sind.

Wir hoffen, dass Euch unsere kleine Vite-Übersicht gefallen hat und sich vielleicht einige Eurer Fragen geklärt haben. Falls Ihr mehr über die Möglichkeiten von Vite lernen möchtet, empfehlen wir Euch einen Blick auf die hervorragende [Dokumentation](https://vite.dev/){:target="_blank"}. Hier können wir noch mal intensiv auf Eure Projekte und Fragen eingehen.

Bis dahin wünschen wir Euch schon mal viel Spaß und viel Erfolg mit Vite!

## Weitere Informationen

- Vite Homepage: [https://vite.dev/](https://vite.dev/){:target="_blank"}
- Vite auf Github: [https://github.com/vitejs/vite](https://github.com/vitejs/vite){:target="_blank"}
- Offizielle Plugins: [https://vite.dev/plugins/#vitejs-plugin-vue](https://vite.dev/plugins/#vitejs-plugin-vue){:target="_blank"}
- Awesome Vite: [https://github.com/vitejs/awesome-vite](https://github.com/vitejs/awesome-vite){:target="_blank"}
