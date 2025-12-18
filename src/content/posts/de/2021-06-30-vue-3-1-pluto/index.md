---
title: "Das ist neu bei Vue 3.1 'Pluto'"
description: "Was ist neu bei Vue 3.1? Wir erklären dir, welche neuen Features die aktuellste Version bereithält und was du mit ihnen anstellen kannst."
author: "Antony Konstantinidis"
published_at: 2021-06-30T14:30:00.000Z
categories: "vuejs release"
tutorial_page_order: "1"
header_image: "header.jpg"
---

Die neueste Vue-Version [Vue 3.1](https://github.com/vuejs/vue-next/releases/tag/v3.1.0), auch Pluto genannt, ist ab sofort verfügbar und stellt viel mehr als nur ein Update zum Vorgänger Vue 2 dar.
Vue 3.1 bringt nämlich nicht nur einige Bugfixes mit sich, sondern auch neue Features wie den Migration Build und einen Lifecycle Hook.

## Migration Build in Vue 3.1

Die wohl wichtigste Neuerung, die in der neuen Minor Version zu finden ist, ist die graduelle Migration von Vue 2.x auf Vue 3.x. Der Migration Build ermöglicht es dir, Apps relativ unkompliziert von der Vorgänger-Version auf die aktuelle Vue 3.1-Version zu übertragen. Der Migration Build ist nämlich mit Vue 2 kompatibel und läuft per Default im Vue-2-Modus. Bedenkt man, dass Vue 3 eine komplette Neufassung ist, ist dieses Feature ziemlich bemerkenswert.

Entwickler:innen können dank Migration Build auch Breaking Changes und Deprecations direkt bearbeiten, weil sich Vue 3 und der SFC-Compiler im abwärtskompatiblen Modus betreiben lassen. Dadurch sparst du dir bei der Migration viel Arbeit und musst nicht deine ganze Anwendung neu schreiben.

Einige Einschränkungen gibt es allerdings auch. Nicht alle Libraries werden bei der Migration funktionieren, vor allem wenn sie Internal APIs verwenden. Entwickler:innen, die auf den Internet Explorer 11 angewiesen sind, werden mit Vue 3.1 leider auch keinen Spaß haben, denn die neue Version hat den Support für den Browser [eingestellt](https://github.com/vuejs/rfcs/discussions/296).

### So geht's

Um es auszuprobieren, musst du in deiner package.json zunächst drei Anpassungen vornehmen:

1. Die bisher verwendete Vue-Version durch die neue Version 3.1 ersetzen
2. Die verwendete Dependency `vue-template-compiler` ersetzen mit dem `@vue/compiler-sfc`-Paket
3. Hinzufügen von `@vue/compat` als neue Dependency

Die Anwendung muss im Kompatibilitätsmodus gestartet werden, indem die Vue CLI, Vite oder die verwendete Webpack Konfiguration aktualisiert wird. Wurde beispielsweise die Vue CLI zum Aufsetzen des Projekts verwendet, kann die `vue.config.js` wie folgt aussehen:

```javascript
module.exports = {
  chainWebpack: (config) => {
    config.resolve.alias.set("vue", "@vue/compat");

    config.module
      .rule("vue")
      .use("vue-loader")
      .tap((options) => {
        return {
          ...options,
          compilerOptions: {
            compatConfig: {
              MODE: 2,
            },
          },
        };
      });
  },
};
```

Die Vue-Importe werden so durch das neue `@vue/compat`-Paket aufgelöst. Dieses stellt ein Mapping zwischen den verwendeten Vue 2 APIs und äquivalenten Vue 3 APIs her.

Die Anwendung sollte jetzt wieder normal gestartet werden können. In der Konsole erscheinen Warnungen, welche dich darüber informieren was geändert werden muss, um die Transition zu Vue 3 zu absolvieren.

Für eine ausführlichere Beschreibung zum Vorgehen wird der offizielle [Upgrade Workflow](https://v3-migration.vuejs.org/migration-build.html#upgrade-workflow) empfohlen.

## Der Lifecycle Hook

Ein weiteres neues Feature von Vue 3.1 ist der neue Lifecycle Hook. Die neue Lifecycle-Funktion heißt `onServerPrefetch` und kann nun auch bei Benutzung der Composition API einfach verwendet werden.

Dieses Feature ist besonders für Entwickler:innen nützlich, die mit serverseitigem Rendern arbeiten. `onServerPrefetch` weist nämlich jetzt den Server-Renderer an, das Rendern zu pausieren, bis das von ihm zurückgegebene Promise aufgelöst ist. Eine ziemlich praktische Funktion für alle, die asynchrone Daten während des serverseitigen Renderns abrufen wollen. Die Funktion kann sogar mehrmals im gleichen Setup parallel aufgerufen werden.

Für alle JavaScript-Entwickler:innen, die mit Vue arbeiten, dürfte Vue 3.1 Pluto eine willkommene Neuerung sein, die langersehnte Fixes, Performance-Verbesserungen und Features mit sich bringt.
