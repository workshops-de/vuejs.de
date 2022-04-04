---
title: "Vue.js 3.2 ... und es geht noch schneller"
description: "Mit Vue.js 3.2 wird alles noch schöner, schneller und besser. Wir übertreiben nicht. Seht selbst, was das neue Release alles bereithält. "
author: "Antony Konstantinidis"
published_at: 2021-08-18 10:30:00.000000Z
categories: "vuejs release"
tutorial_page_order: '1'
---

Seit dem 5. August ist Vue in Version 3.2 erhältlich. Doch was bringt das neue Update des beliebten JavaScript Frameworks? Wir haben unter die Haube geschaut und festgestellt, dass Vue 3.2 wieder neue Meilensteine in Sachen Performance setzt.

Was Vue 3.2 alles so bereithält, wollen wir Euch nun im Einzelnen verraten.

## Noch schneller? Warum nicht?

Viele kleinere Verbesserungen wurden vorgenommen, um noch mehr Leistung aus Vue herauszuholen. So wurden z. B. die virtuellen DOM-Funktionen auf niedriger Ebene überarbeitet und viele Laufzeitprüfungen können nun dank des neuen Compilers ausgelassen werden. Zudem wurde der Reactivity-Bereich der API überarbeitet, was die Funktionen `ref`, `watch`, `computed` und `effect` beschleunigt. Dank der neuen `ref`-Implementierung erfolgt das Lesen bis zu 260 % schneller, auch das Dependency Tracking ist nun um bis zu 40 % schneller. Selbst der Template Compiler hat einen Performance-Boost erlebt und kann VNodes bis zu 200 % schneller erstellen.

Dank der neuen `v-memo` Direktive kann nun ein Teil des Template-Baums gespeichert werden, wodurch das Virtual DOM Diffing und die Erstellung neuer VNodes übersprungen werden kann.

## `v-memo`

Eine der wesentlichsten Performance-Verbesserungen beruht auf der [v-memo](https://vuejs.org/api/built-in-directives.html#v-memo){:target="_blank"} Direktive, die vor allem Templates extrem optimieren kann.

Beispiel:

```
<div v-for="user of users" :key="user.id" v-memo="[user.name]">
  {{ user.name }}
</div>
```

Ohne `v-memo` würde ein neues virtuelles div erzeugt werden, sobald sich etwas an einem der Einträge in dem `users` Array ändert. Mit `v-memo` wird das virtuelle Element nicht neu erstellt und das vorherige kann wiederverwendet werden, so lange sich nicht der Name eines Eintrags verändert.
Das klingt erst einmal nicht nach viel, rechnet sich aber, wenn man viele Elemente rendern muss.

Ein weiterer Vorteil: `v-memo` akzeptiert ein Array von Konditionen. So könnt Ihr zum Beispiel folgenden Code schreiben:

```
<div v-for="user of users" :key="user.id" v-memo="[user.name, selectedUserId === user.id]">
  <p :class="{ rot: selectedUserId === user.id }">{{ user.name }}</p>
</div>
```

Das div aktualisiert sich nur dann, wenn sich der Benutzername oder die Variable `selectedUserId` ändert.

## `effectScope` API

Auch neu in Vue 3.2 ist die neue [effectScope](https://github.com/vuejs/rfcs/pull/212){:target="_blank"} API. Hiermit kann das Disposal Timing reaktiver Effekte (`computed` und `watchers`) gesteuert werden. Das heißt: Es wird einfacher Abhängigkeiten gezielt zu sammeln und zu zerstören.

Funktionen wie `watch` oder `computed` sind normalerweise an Komponenteninstanzen gebunden. Sobald die Komponente zerstört wird, werden auch diese automatisch bereinigt, um mögliche Speicherlecks zu verhindern. Wollt Ihr diese Funktionen aber außerhalb von Komponenten verwenden, müssen sie manuell gesammelt und eine Löschung ermöglicht werden. Das kann dann zu folgenden Beispiel-Code führen:

```
import { ref, computed, stop, watchEffect } from 'vue';

const quantity = ref(0);
const price = ref(10);
const total = computed(() => quantity.value * price.value);
const stopWatch = watchEffect(() => console.log(`total changed to ${total.value}`));

let effectsToStop = [];
effectsToStop.push(() => stop(total));
effectsToStop.push(stopWatch);

const stopAll = () => {
  effectsToStop.forEach(f => f())
  effectsToStop = []
};

// calling `stopAll()` disposes of all effects
stopAll();
```

`effectScope` erlaubt es, einen Bereich zu definieren, in dem beliebiger Code ausgeführt wird. Die in diesem Code ausgeführten Effekte werden gesammelt und können bei Bedarf einfach gestoppt werden:

```
const quantity = ref(0);
const price = ref(10);

const scope = effectScope();

scope.run(() => {
  const total = computed(() => quantity.value * price.value);
  watchEffect(() => console.log(`total changed to ${total.value}`));
});

// calling `scope.stop()` disposes of all effects
scope.stop();
```

Es lassen sich noch viel mehr Sachen mit der neuen API umsetzen. Für einen ausführlicheren Einblick empfehlen wir den [RFC #212](https://github.com/vuejs/rfcs/pull/212){:target="_blank"} zu lesen.

## `expose` API

In Vue 3.2 kommt eine weitere neue API hinzu – die [expose API](https://vuejs.org/api/reactivity-advanced.html#effectscope){:target="_blank"}. Diese definiert, was von einer Komponente alles weitergegeben wird. Ihr erinnert Euch vielleicht: In der Vorgängerversion wurde noch alles, was im Template verwendbar war, an andere Komponenten über `ref` oder `$parent` weitergegeben.

Die neue Funktion `expose` wird innerhalb von `setup` verwendet. Im folgenden Beispiel wird nur die `toggle` Funktion weitergeben, nicht aber die `collapsed` Variable.

```
export default defineComponent({
  setup(props, { expose }) {
    const collapsed = ref(true)
    const toggle = () => {
      collapsed.value = !collapsed.value;
    }
    // nur `toggle` für die übergeordnete Komponente sichtbar machen
    expose({ toggle })
    return { collapsed, toggle }
  }
})
```

## `.prop` und `.attr` Modifikatoren

In Vue 3.2 tritt der `.prop` Modifikator aus Vue 2 wieder in Erscheinung. Zusätzlich wird der `.attr` Modifikator für `v-bind` hinzugefügt.

Diese Modifikatoren wurden für Fälle eingeführt, in denen man eine Prop oder ein Attribut setzen und sich nicht auf das Standardverhalten verlassen möchte.

Standardmäßig versucht Vue 3 eine übergebene Eigenschaft an eine Prop zu binden und greift erst auf ein Attribut zurück, wenn es keine Prop mit dem Namen gibt.

Durch die Verwendung der zuvor genannten Modifikatoren kann dieses Standardverhalten umgangen werden:

```
<a :title.prop="linkTitle" :aria-selected.attr="isSelected">Link</a>
```

Neben den bereits bekannten Kurzschreibweisen für `v-bind` (`:`) und `v-on` (`@`), führt Vue hierfür neue Kürzel ein:

- `.`, für eine Prop und
- `^`, um ein Attribut zu binden.

Das könnte dann ungefähr so aussehen:

```
<a .title="linkTitle" ^aria-selected="isSelected">Link</a>
```

## `async` Setup

Auch neu in Vue 3.2 ist eine Verbesserung des asynchronen Setups. In Vue 3 wurden Lifecycle Hooks nach dem `await` Aufruf nicht mehr ausgeführt, da sie sich im Inneren der Komponente befinden müssen, zum Beispiel hier:

```
async setup() {
  onMounted(() => console.log('hello'));
  const user = await fetchUser();
  onMounted(() => console.log('world')); // is never called
}
```

Man musste selber darauf achten, dass sich sämtliche Lifecycle Hooks vor dem ersten `await` befinden, um eine Ausführung sicherzustellen. Einen hervorragenden Beitrag, welcher die Details dazu näher beleuchtet findet Ihr [hier](https://antfu.me/posts/async-with-composition-api){:target="_blank"}.

In Vue 3.2 wurde dieses Problem behoben. Vue stellt den Kontext nach einem `await`-Aufruf nun wieder her und sorgt dafür, dass dieses Problem verschwindet.

## Neue SFC-Funktionen: `script setup` und `v-bind` im `style`-Block

Gute Nachrichten: Zwei neue Features für Single File Components gelten nun als stabil. Und daraus ergeben sich einige neue Möglichkeiten:

`<script setup>` ist ein syntaktischer Zucker zur Kompilierungszeit, der die Benutzung der Composition API innerhalb von SFCs erheblich vereinfacht. Die [Dokumentation](https://vuejs.org/api/sfc-script-setup.html){:target="_blank"} wurde bereits entsprechend erweitert, falls Ihr euch dazu etwas mehr Wissen aneignen möchtet.

`v-bind` kann nun auch in `<style>`-Tags verwendet werden, um CSS-Werte dynamisch an den State der Komponente zu binden. Weitere Informationen hierzu finden sich auch bereits in der [offiziellen Dokumentation](https://vuejs.org/api/sfc-css-features.html){:target="_blank"}.

Hier ein Beispiel, wie sich diese beiden Elemente verwenden lassen:

```
<script setup>
import { ref } from 'vue';

const color = ref('red');
</script>

<template>
  <button @click="color = color === 'red' ? 'green' : 'red'">
    Color is: {{ color }}
  </button>
</template>

<style scoped>
button {
  color: v-bind(color);
}
</style>
```

Das Beispiel kann im [SFC Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcblxuY29uc3QgY29sb3IgPSByZWYoJ3JlZCcpXG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8YnV0dG9uIEBjbGljaz1cImNvbG9yID0gY29sb3IgPT09ICdyZWQnID8gJ2dyZWVuJyA6ICdyZWQnXCI+XG4gICAgQ29sb3IgaXM6IHt7IGNvbG9yIH19XG4gIDwvYnV0dG9uPlxuPC90ZW1wbGF0ZT5cblxuPHN0eWxlIHNjb3BlZD5cbmJ1dHRvbiB7XG4gIGNvbG9yOiB2LWJpbmQoY29sb3IpO1xufVxuPC9zdHlsZT4ifQ==){:target="_blank"} auch direkt live ausprobiert werden.

## Web Components

Mit Vue 3.2 wird eine neue `defineCustomElement`-Methode für die einfache Erstellung von [Web Components aus Vue Komponenten](https://vuejs.org/guide/extras/web-components.html){:target="_blank"} eingeführt:

```
import { defineCustomElement } from 'vue'

const MyVueElement = defineCustomElement({
  // normal Vue component options here
})

// Register the custom element.
// After registration, all `<my-vue-element>` tags
// on the page will be upgraded.
customElements.define('my-vue-element', MyVueElement)
```

Jede Vue Komponente kann so in eine Web Component verwandelt werden. Dadurch habt Ihr die Möglichkeit, Vue Komponenten in anderen Anwendungen wie z. B. VanillaJS, Angular oder React einzusetzen. Natürlich nur, wenn Ihr das möchtet.

Der einzige Nachteil besteht darin, dass das benutzerdefinierte Element immer noch die Vue Runtime verwendet. Auch wenn Vue relativ klein ist und wenig Speicher benötigt, ist die Datei etwas größer, als würde man die Komponente in VanillaJS bauen. Eine Alternative wäre, mehrere benutzerdefinierte Elemente ohne Runtime zu bündeln und Vue nur ein Mal auf der Seite zu laden, wo es benötigt wird.

## Server-side Rendering

Das `@vue/server-renderer`-Paket in Version 3.2 bietet nun einen ES-Modul-Build, der von Node.js-Build-Ins getrennt ist. Dadurch lässt sich `@vue/server-renderer` innerhalb von Nicht-Node.js-Laufzeiten wie CloudFlare Workers oder Service Workers [nutzen](https://github.com/vuejs/vue-next/tree/master/packages/server-renderer#streaming-api){:target="_blank"}.

Wir hoffen, dass wir Euch einen kleinen Überblick über die vielen neuen Funktionen und Verbesserungen von Vue 3.2 geben konnten. Wenn Ihr der Meinung seid, hier fehlt was, dann schreibt uns gerne per E-Mail oder kommt auf unseren Discord-Server.

Noch mehr geballtes Wissen, findet Ihr übrigens in unseren Intensiv-Schulungen – falls Ihr von uns nicht genug bekommen könnt. 😉👍
