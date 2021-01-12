---
title: "hygen.io - der zeitsparende Code-Generator für Vue"
description: "Mit hygen.io als Code-Generator ist Schluss mit dem ständigen Copy & Paste. Erfahrt jetzt, wie Ihr es im nächsten Vue Projekt erfolgreich einsetzen könnt."
author: "Antony Konstantinidis"
published_at: 2021-01-12 20:00:00.000000Z
categories: "vuejs advanced"
tutorial_page_order: '1'
---

Viele Entwickler beginnen ein neues Frontend-Projekt mittels einer CLI (command-line interface). Alle neuen Frameworks besitzen diese Funktionalität, um den Entwicklern das Leben etwas zu vereinfachen und die Erstellung der Code-Basis sowie der Projektstruktur einfach und stabil zu machen.

Vue liefert mit der [Vue CLI](https://cli.vuejs.org){:target="_blank"} ebenfalls ein solches Tooling standardmäßig aus. Vollgepackt mit außergewöhnlichen Werkzeugen, die ein schnelles und intuitives Scaffolding ermöglichen, muss sich der Entwickler nicht mehr um aufwendige Webpack-Konfigurationen kümmern. Out-of-the-box lassen sich so Dinge wie TypeScript-Support, Linter, Unit Testing und andere Funktionen über wenige Klicks automatisch in ein funktionierendes Projekt-Setup umsetzen. Mittlerweile steht sogar eine grafische Benutzeroberfläche zur Verfügung, wenn man die Konsole nicht nutzen möchte.

Doch wie geht es weiter, nachdem das Projekt und die grundlegende Ordnerstruktur von der CLI erstellt worden ist? Alle großen Frameworks arbeiten mit Komponenten. Dennoch gibt es auch hier Unterschiede zwischen Entwicklern und Teams. Einige arbeiten mit [Single File Components (SFC)](https://v3.vuejs.org/guide/single-file-component.html#single-file-components){:target="_blank"}, andere bevorzugen lieber das [Separation of Concerns Prinzip](https://v3.vuejs.org/guide/single-file-component.html#what-about-separation-of-concerns){:target="_blank"}. 

Außerdem unterscheidet sich die Arbeit mit Vue häufig in der Nutzung von JavaScript vs. Typescript, der Nutzung eines Präprozessors wie Sass/Less/Stylus oder noch spezieller anhand einzelner Design-Entscheidungen, wie z.B. der Verwendung von [BEM](http://getbem.com){:target="_blank"} oder der [Composition API](https://vuejs.de/artikel/composition-api-teil-1/){:target="_blank"}.

Das bedeutet, dass wir während der Entwicklung unseren eigenen Workflow geschaffen haben, der aus einer Menge "Copy & Paste" besteht, um neue Komponenten in dem gewählten Stil anzulegen. Einige Entwicklungsumgebungen wie [Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=sdras.vue-vscode-snippets){:target="_blank"} oder [WebStorm](https://www.jetbrains.com/help/webstorm/using-live-templates.html){:target="_blank"} bieten die Möglichkeit sogenannte Templates anzulegen, womit z.B. der Inhalt bestimmter Dateien automatisch generiert werden kann. 

Jede dieser Möglichkeit besitzt allerdings wiederum eigene Beschränkungen. Das Anlegen der Templates durch jeden Entwickler in seiner individuellen Umgebung außerhalb des Projekt-Setups, zählt dabei nur zu einem der Nachteile dieser Lösungen.

An dieser Stelle spielt [hygen.io](https://www.hygen.io){:target="_blank"} als Code-Generator seine Stärken aus. Die Konfiguration ist sehr einfach und kann mit jedem beliebigen Framework oder Setup verwendet werden. In diesem Artikel wollen wir Euch zeigen, wie Ihr es für Eure neuen oder bestehenden Vue Projekte einsetzen könnt.

## Hygen installieren

Hygen kann auf drei verschiedene Arten installiert werden. Welche davon verwendet wird kann vollkommen frei gewählt werden:

Unter macOS und Homebrew:
```shell
brew tap jondot/tap
brew install hygen
```

Über npm (oder yarn):
```shell
npm i hygen
```

Oder direkt ausgeführt über den Package Runner [npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b){:target="_blank"}:

```shell
npx hygen ...
```

## `init self` zur Benutzung innerhalb eines Projekts

Da wir hygen nutzen wollen, um wiederkehrende Aufgaben, wie das Schreiben von Komponenten innerhalb eines Projekts zu vereinfachen, nutzen wir an der Stelle die Variante über NPM und das Ablegen der Dependency in unserer `package.json` als `devDependency`:

```shell
npm i -D hygen
```

Dadurch erhalten alle unsere Teammitglieder ebenfalls die Möglichkeit die Code-Generatoren zu verwenden und jeder besitzt dasselbe Setup, ohne seine Umgebung per Hand einrichten zu müssen.

Wie bereits erwähnt befinden wir uns für dieses Beispiel in einem Projektumfeld. Um das Beispiel hier übersichtlich zu halten, haben wir im Vorfeld ein neues Projekt mithilfe der Vue CLI angelegt.

```shell
vue create hygen-vue
```

Um hygen letztlich verwenden zu können, muss es zunächst initialisiert werden. Wir wechseln dafür in den Ordner mit unserem Vue Projekt, in dem wir zuvor hygen als Dependency hinzugefügt haben. Hier verwenden wir den folgenden Befehl:

```shell
hygen init self
```

hygen kommt mit zwei vorgefertigten Generatoren, die dabei helfen unsere eigenen Generatoren zu bauen. In Eurem Projektordner solltet Ihr daher jetzt einen neuen Ordner namens `_templates` vorfinden. 

## Unser Vorhaben

In jedem Vue Projekt kehrt die Aufgabe wieder eine neue Komponente zu erstellen. Daher wollen wir uns einen einfachen Generator erstellen, der uns eine neue `.vue` Datei anlegt und folgenden Aufbau vorgibt:

1. Eine Single File Component mit `template`, `script` und `style` Blöcken
2. TypeScript und die Composition API sollen verwendet werden
3. SCSS und BEM für das Styling der Komponente

Eine Beispielkomponente, die alle angegebenen Anforderungen erfüllt, sieht demnach wie folgt aus:

```
<template>
  <div class="MyComponent">
    <h1>My new Vue Component with the name MyComponent</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MyComponent',
  setup() {},
});
</script>

<style lang="scss">
.MyComponent {
}
</style>
``` 

## Erstellung des Generators mit hygen

Unseren eigenen Generator können wir ganz einfach mit dieser Anweisung an hygen erzeugen lassen

```shell
hygen generator new component
```

In unserem Ordner sollten wir nun unter `_templates` einen neuen Unterordner namens `component` wiederfinden, in dem sich wiederum ein Ordner mit den Namen `new` befindet. In diesem liegt eine Datei namens `hello.ejs.t`

- _templates
    - component
        - new
            - hello.ejs.t 
            
Um unseren Generator auszuführen, verwenden wir ein ähnliches Kommando wie das zur Generator-Erstellung, wobei Euch hier die Bestandteile wesentlich bekannter vorkommen sollten, da sie sich an der Ordnerstruktur orientieren:

```shell
hygen component new
```

Nachdem wir den Befehl ausgeführt haben, finden wir unter `app/hello.js` eine automatisch generierte Datei vor. Grundsätzlich funktioniert unser eigener Generator also schon einmal 🥳.

## Anpassung des Generators zur Erstellung einer Vue Komponente

Wir nähern uns jetzt unserem Ziel. Der Generator soll dabei nicht irgendeine Datei, sondern eine Vue Komponente mit den zuvor erwähnten Anforderungen erzeugen lassen. Hierzu müssen wir uns mit der Funktionsweise von hygen vertraut machen.

Dazu schauen wir uns unseren erstellten Generator genauer an und zwar die Datei `hello.ejs.t`:

```
---
to: app/hello.js
---
const hello = `
Hello!
This is your first hygen template.

Learn what it can do here:

https://github.com/jondot/hygen
`

console.log(hello)
```

Einige der Konstrukte sehen nach gewöhnlichem JavaScript aus, andere wiederum wirken noch etwas fremd. Unterteilt wird die Datei in zwei Bereiche. Zu erkennen ist das an den gestrichelten Linien.
Innerhalb dieser befinden sich die sogenannten Metadaten: der *head* der Datei. Dieser entspricht der YAML-Syntax.
Darunter befindet sich der zu generierende Inhalt der Zieldatei: der *body*. Die hier verwendete Sprache kann frei gewählt werden. Wir verwenden JavaScript. 

Wenn wir uns jetzt an die Datei-Ausgabe unter `app/hello.js` zurückerinnern, sollten wir viele Zusammenhänge erkennen. Zum einen entspricht der Inhalt dieser Datei genau dem *body* unseres Generators und zum anderen wird durch den im *head* Bereich angegebenen Befehl der Ablageort definiert:

```
to: app/hello.js
```

### Änderung des Ausgabepfades und des Dateinamens

Mit dem Standard-Setup der Vue CLI befinden sich die Komponenten im Ordner `components` unter `src`. Da es sich bei unseren zu generierenden Dateien um SFCs handelt, benötigen wir außerdem die Dateiendung `.vue`.
Diese beiden Anpassungen können wir relativ einfach vornehmen, indem wir den *head* Bereich der Datei `hello.ejs.t` wie folgt verändern:

```
to: src/components/MyComponent.vue
```

Natürlich können wir die Änderung auch direkt ausprobieren, indem wir den Generator einfach noch einmal ausführen lassen:

```shell
hygen generator new component
```

Als Ergebnis solltet Ihr nun eine neue Datei namens `MyComponent.vue` unter `src/components` wiederfinden.

### Ausgabe des richtigen Inhalts der generierten Datei

Den Inhalt der generierten Datei können wir ebenso einfach austauschen. Dafür kopieren wir den weiter oben gezeigten Code unserer Beispielkomponente und fügen diesen in den *body* Bereich der Datei `hello.ejs.t` ein:

```
---
to: src/components/MyComponent.vue
---
<template>
  <div class="MyComponent">
    <h1>My new Vue Component with the name MyComponent</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MyComponent',
  setup() {},
});
</script>

<style lang="scss">
.MyComponent {
}
</style>
```

Ein weiteres Ausführen des Generators führt nun zum gewünschten Ergebnis. Zumindest fast. Ein Problem bleibt bestehen: Jedes Mal legen wir die gleiche Datei mit demselben Namen an und müssen diesen händisch an sechs Stellen anpassen.

## Die Nutzung von Variablen in hygen

Das Anlegen von statischen Dateien nimmt uns bereits einen Teil der Arbeit ab. Da wir im Vorfeld aber meistens mindestens noch den Namen der zu erstellenden Komponente wissen, wollen wir uns die Möglichkeit anschauen, dynamische Inhalte zu generieren.

Für dieses Vorhaben bietet hygen uns Variablen an. Der für unser Beispiel naheliegende und bereits unterstützte ist `name`.

```shell
hygen generator new component HygenDemo
``` 

Hygen erlaubt es uns am Ende des Aufrufs, einen weiteren Parameter anzuhängen, der uns in unserem Template als `name` zur Verfügung gestellt wird. 
Die unter anderem aus Java Server Pages und Ruby on Rails bekannte Syntax `<%= name %>` kann zur Ausgabe der Variable in unserem Template verwendet werden:

```
---
to: src/components/<%= name %>
---
<template>
  <div class="<%= name.toLowerCase() %>">
    <h1>My new Vue Component with the name <%= name %></h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: '<%= name %>',
  setup() {},
});
</script>

<style lang="scss">
.<%= name.toLowerCase() %> {
}
</style>
```

Die gesamte Template-Datei wird von der Template-Engine [EJS](https://ejs.co){:target="_blank"} verarbeitet, sodass uns hier noch mehr Möglichkeiten zur Verfügung stehen.
Wir haben uns hauptsächlich der Ausgabe der Variablen `name` bedient und an zwei Stellen für das Styling noch eine Transformation des angegebenen Namens in Kleinbuchstaben vorgenommen.

Ein letzter Test zeigt uns, dass wir unseren ersten funktionsfähigen Generator zur Erstellung von Vue Komponenten erstellt haben. Damit steht unserer Produktivität nichts mehr im Weg 🚀.

## Ausblick

Wir hoffen, Euch hat der erste kurze Einblick in hygen.io und die Generierung von Code gefallen und Ihr könnt damit den nervigen Zeitfresser Copy & Paste beim Schreiben von Vue Anwendungen loswerden. 

Gebt uns gerne [Feedback](https://vuejs.de/slack){:target="_blank"}, ob Ihr noch mehr in diese Richtung erfahren wollt. Mit hygen lassen sich noch viel umfangreichere Funktionen umsetzen, wie zum Beispiel:

1. Nutzung von *prompts*: Damit können vom Nutzer zusätzliche Eingaben abgefragt werden, um die Code-Generierung flexibler zu gestalten und dynamische Inhalte abbilden zu können.
2. Die Erzeugung mehrerer Dateien innerhalb eines Generators.
3. Automatisches Hinzufügen von Node Dependencies beim Ausführen von Generatoren, sogenannte *injects*.
4. und vieles mehr
