---
title: "Vue.js 3 – das JavaScript Framework im neuem Gewand"
description: "Das beliebte Framework Vue.js ist jetzt in Version 3.0 verfügbar. Welche Vorteile und Verbesserungen es bietet, erfahrt Ihr hier."
author: "Antony Konstantinidis"
published_at: 2020-10-05 19:00:00.000000Z
categories: "vuejs release"
---

Gute Nachrichten für alle JavaScript-Entwickler: Das beliebte Framework Vue.js ist jetzt mit Version 3.0 verfügbar. 
Neben dem neuen Kern, der vollständig in TypeScript geschrieben wurde und vielen weitere Features wie Composition API, verbesserte Performance, 
kleinere Bundle-Größen, schnelleres Rendering und Multi-Root-Komponenten bietet Vue.js 3 zahlreiche Optimierungen.

Mit mehr als weltweit 1,3 Mio. Nutzern ist Vue.js eines der erfolgreichsten JavaScript Frameworks derzeit und erfreut sich größter Beliebtheit. 
Wie viel Arbeit in die neue Version eingeflossen ist, lässt sich anhand dieser Zahlen gut ablesen: 
2 Jahre Entwicklungszeit, 30 Change-Requests (RFC), über 2.600 Commits und 628 Pull Requests von über 99 beteiligten Entwicklern. 
So sollte Team-Work immer aussehen.

Mit Version 3.0 wird nun erstmals die neue Composition API vorgestellt, 
die komplexe Anwendungen noch mehr vereinfachen soll. Sie basiert auf der Reactivity-API und sorgt für einen logischeren Aufbau, ähnlich React Hooks. 
Mit der Composition API sollen Komponenten künftig einfacher und vor allem übersichtlicher strukturiert werden. 
Ein großer Vorteil gerade bei großen Anwendungen. Wer die Composition API in Version 2.0 integrieren möchte, findet hier übrigens das [passende Plug-in](https://github.com/vuejs/composition-api){:target="_blank"}.
Sehr erwähnenswert ist ebenso das Tree Shaking – das „Abwerfen“ alter, nicht mehr verbundener Code-Pakete, was der Performance wieder zugutekommt.

Eine der größeren Neuerungen ist sicherlich, dass der Kern des Frameworks in TypeScript neu geschrieben wurde, 
was die Performance noch weiter verbessern soll. Außerdem kann somit nun der gesamte Code ordentlich typisiert werden. 
Die API unterstützt dabei sowohl TypeScript als auch JavaScript. Somit haben Entwickler die Wahl, ob sie Typescript nutzen möchten oder nicht.  
Durch den neuen Kern und etlichen Verbesserungen hat sich die Performance entsprechend verbessert. 
In dieser [Vergleichs-Tabelle](https://docs.google.com/spreadsheets/d/1VJFx-kQ4KjJmnpDXIEaig-cVAAJtpIGLZNbv3Lr4CR0/edit#gid=0){:target="_blank"} findet Ihr eine gute Übersicht zwischen den Verbesserungen von Vue 2 auf Vue 3. 
Vor allem unter Chrome zeigt Vue 3 wirklich, was es leisten kann. Geschwindigkeitszuwächse von bis zu 264 % konnten z. B. Komponenten mit nicht reaktiven Zuständen erzielt werden. Aber auch die 55 % bei vorhandener Reaktivität können sich mehr als sehen lassen.

Mit Version 3.0 gilt die API nun als stabil. 
Dennoch gibt es Unterprojekte, die diesen Status noch nicht erreicht haben, z. B. der Vue Router oder das State-Management Vuex. 

Am besten sehr Ihr selbst, was Vue.js Erfinder und Chefentwickler Evan You über die neue Version zu sagen hat:

<iframe width="560" height="315" src="https://www.youtube.com/embed/Vp5ANvd88x0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
_Evan You // Keynote: Live Free Online Announcement // Vuejs Global Online_

## Die wichtigsten Neuerung von Vue.js 3 auf einen Blick:

* Composition API (optional) für mehr Übersichtlichkeit über alle Komponenten
* 41 % weniger Speicherbedarf (unter 20 kB)
* Schlankes Framework, da nur benötigte Komponenten importiert werden 
* Verbesserte Performance dank reduziertem Workload für den Virtual DOM, verbesserten Diffing-Algorithmen, Compiler-basierten Optionen uvm.
* Der Kern von Vue.js 3.0 ist in TypeScript verfasst/verbesserter TypeScript Support
* [Überarbeitete Dokumentation](https://v3.vuejs.org/){:target="_blank"} für Vue 3.0

**Das Besondere**: Mit Version 3.0 werden einige experimentelle Funktionen wie `<suspense>`, `<style vars>` ([RFC](https://github.com/vuejs/rfcs/blob/sfc-improvements/active-rfcs/0000-sfc-style-variables.md){:target="_blank"}) und `<script setup>` ([RFC](https://github.com/vuejs/rfcs/blob/sfc-improvements/active-rfcs/0000-sfc-script-setup.md){:target="_blank"}) eingeführt, 
die aber voraussichtlich erst mit Version 3.1 final sind. 
`<script setup>` solltet Ihr Euch näher ansehen, da sich hiermit in den Composition API inside Single File Components ein Kompilierungsschritt einbauen lässt.
Außerdem wurde die Beta-Version der neuen Vue Devtools veröffentlicht. 
Seit dem 2. September findet Ihr hierzu auch die Devtools Erweiterung im [Chrome Web Store](https://chrome.google.com/webstore/detail/vuejs-devtools/ljjemllljcmogpfapbkkighbhhppjdbg){:target="_blank"}. 

Auf Wunsch vieler Entwickler soll auch bald wieder der Internet Explorer 11 (IE11) in Vue.js 3.0 unterstützt werden.

## Ein paar der neuen Funktionen, die Ihr Euch anschauen solltet:

* [Composition API](https://v3.vuejs.org/guide/composition-api-introduction.html){:target="_blank"} für mehr Übersichtlichkeit
* [Teleport](https://v3.vuejs.org/guide/teleport.html){:target="_blank"} (vorher bekannt als Portale)
* [Fragments](https://v3.vuejs.org/guide/migration/fragments.html){:target="_blank"} (virtuelle Elemente, die nicht im DOM gerendert werden)
* [createRenderer API](https://github.com/vuejs/vue-next/tree/master/packages/runtime-core){:target="_blank"}, um benutzerdefinierte Renderer zu erzeugen 
* [Component-State-driven CSS-Variablen](https://github.com/vuejs/rfcs/blob/sfc-improvements/active-rfcs/0000-sfc-style-variables.md){:target="_blank"} für Single File Components (SFC)

## Was hat sich seit Vue.js 2.0 geändert?

* [Global API](https://v3.vuejs.org/guide/migration/global-api.html#a-new-global-api-createapp){:target="_blank"}
* [Global Vue API Treeshaking](https://v3.vuejs.org/guide/migration/global-api-treeshaking.html){:target="_blank"}
* [v-model](https://v3.vuejs.org/guide/migration/v-model.html#overview){:target="_blank"}
* [Functional Components](https://v3.vuejs.org/guide/migration/functional-components.html){:target="_blank"}
* [Async Components](https://v3.vuejs.org/guide/migration/async-components.html){:target="_blank"}
* [Render Function API](https://v3.vuejs.org/guide/migration/render-function-api.html#overview){:target="_blank"}
* [Slots Unification](https://v3.vuejs.org/guide/migration/slots-unification.html){:target="_blank"}

Eine Liste mit weiteren kleinen Änderungen findet Ihr hier: [Other Minor Changes](https://v3.vuejs.org/guide/migration/introduction.html#other-minor-changes){:target="_blank"}

## Welche APIs wurden in Vue.js 3.0 entfernt?
* [Keycode Support](https://v3.vuejs.org/guide/migration/keycode-modifiers.html#overview){:target="_blank"}
* [$on, $off and $once Instanzen](https://v3.vuejs.org/guide/migration/events-api.html#overview){:target="_blank"}
* [Filter](https://v3.vuejs.org/guide/migration/filters.html#overview){:target="_blank"}
* [Inline Template Attributes](https://v3.vuejs.org/guide/migration/inline-template-attribute.html#overview){:target="_blank"}

## Folgende Libraries werden mit Vue.js 3.0 unterstützt – wobei noch einige sich im Beta-Stadium befinden:
* [Vue CLI](https://v3.vuejs.org/guide/migration/introduction.html#vue-cli){:target="_blank"}
* [Vue Router](https://v3.vuejs.org/guide/migration/introduction.html#vue-router){:target="_blank"}
* [Vuex](https://v3.vuejs.org/guide/migration/introduction.html#vuex){:target="_blank"} (hier hat sich nur die Art der Installation geändert)
* [Devtools Extension](https://v3.vuejs.org/guide/migration/introduction.html#devtools-extension){:target="_blank"} (Vuex und Vue Router soll demnächst integriert werden)

## Unser Fazit
Insgesamt lässt sich sagen, dass die neue Vue.js Versionen einen sehr guten Eindruck macht und auch zukünftig die App-Entwicklung vereinfachen wird. 
Natürlich gab es auch in Vergangenheit hierzu einige kritische Stimmen, gerade was die Composition API angeht. 
Mit Version 3.0 sollten aber auch die letzten Kritiker besänftigt sein. 
Auch wenn viele Projekte noch Work-in-Progress und vermutlich erst Ende 2020 abgeschlossen sind, 
lohnt es sich jetzt schon auf die neue Version zu migrieren.

Ihr habt noch Fragen oder möchtet Euch mehr in die neuen Funktionen einarbeiten? Die überarbeitete Dokumentation findet Ihr unter [v3.vuejs.org](https://v3.vuejs.org/){:target="_blank"}.
