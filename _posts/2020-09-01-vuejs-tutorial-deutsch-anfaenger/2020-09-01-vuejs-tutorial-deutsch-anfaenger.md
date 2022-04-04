---
title: "Vue 3 Tutorial für Einsteiger"
description: "Einsteiger Tutorial für das Javascript Framework Vue.js in Version 3. Schritt für Schritt erklären wir dir die Konzepte und Verbesserungen der Composition API."
author: "Antony Konstantinidis"
published_at: 2020-09-01 16:00:00.000000Z
categories: "tutorial vuejs typescript"
tutorial_page_order: '1'
---

Die lang erwartete Version 3 des beliebten JavaScript Frameworks Vue.js ist offiziell freigegeben worden und schon vor dem Release wurde der aktuelle [Release Candidate](https://github.com/vuejs/vue-next/tags){:target="_blank"} bereits ausgiebig getestet und verwendet.
Wenn du dich fragst, was die Hauptmerkmale und wichtigsten Änderungen von Vue 3 sind, bist du hier schon einmal richtig. Bereits die Ankündigung der neuen Composition API hat zu einigen Kontroversen geführt, welche mittlerweile jedoch zur Zufriedenheit aller beendet sind. In diesem Artikel beleuchten wir hauptsächlich diese neue API näher.

Das finale Release erfolgte am 18. September 2020, doch schon zuvor konnte die Composition API über ein Plug-in bereits in bestehende Vue Anwendungen integriert und verwendet werden.
In diesem Artikel sollen unter anderem die folgenden Fragen geklärt werden:

* Was ist Vue?
* Was verbirgt sich hinter der Composition API?
* Warum wurde die Composition API eingeführt?
* Wie funktioniert die Composition API?

In diesem kostenlosen Online-Tutorial werden wir zwei Versionen derselben Komponente erstellen: eine davon mit der Composition API, die andere mit der Options API, dem aktuellen Standard zum Schreiben von Komponenten in Vue.js.

<hr>
<div class="workshop-hint">
  <div class="h3">Keine Lust zu lesen?</div>
  <div class="row mb-2">
    <div class="col-xs-12 col-md-6">
      <p>
        Nicht jeder lernt am besten aus Büchern und Artikeln. Lernen darf interaktiv sein und Spaß machen. Wir bieten dir auch
        <a target="_blank" href="https://workshops.de/seminare-schulungen-kurse/vuejs-typescript?utm_source=vuejs_de&utm_campaign=tutorial&utm_medium=link&utm_content=text-top">Vue Intensiv-Schulungen</a> an, damit du tiefer in die Thematik einsteigen kannst.
      </p>
      <p class="">
        <a target="_blank" href="https://workshops.de/seminare-schulungen-kurse/vuejs-typescript?utm_source=vuejs_de&utm_campaign=tutorial&utm_medium=button&utm_content=text-top">
          <button class="btn btn-danger">Mehr Informationen zur Vue3-Schulung</button>
        </a>
      </p>
    </div>
    <div class="col-xs-12 col-md-6">
      <img class="img-fluid img-rounded" src="workshops-attendees.png" alt="Teilnehmer:innen in der Veranstaltung Vue-Intensiv-Workshop">
    </div>
  </div>
</div>
<hr>

## Was ist Vue?

Vue (oder Vue.js) ist ein Open-Source Javascript-Framework für die Frontendentwicklung.
Im Gegensatz zu anderen beliebten JavaScript-Frameworks wird Vue nicht von einem großen Unternehmen wie React (Facebook) oder Angular (Google) unterstützt.
Vue wurde ursprünglich von Evan You und mittlerweile von einer größeren Open-Source-Community geschrieben.

Wie in allen gängigen Frameworks, wird auch in Vue komponentenorientiert gearbeitet. Eine Anwendung wird dabei in kleinere Bestandteile (Bausteine, Komponenten) zerlegt.
Dadurch werden einfach wiederverwendbare und pflegbare Einheiten erstellt, die in eine hierarchische Struktur gebracht werden, um somit eine größere Anwendung Stück für Stück zusammenzusetzen.
Komponenten bilden somit die fundamentalen Bausteine einer Anwendung. In folgender Grafik wird veranschaulicht, wie eine Webseite in Komponenten zerlegt und in Form einer Baumstruktur in Beziehung zueinander gebracht werden kann:

<a href="https://v2.vuejs.org/v2/guide/#Composing-with-Components" target="_blank"><img class="img-fluid center img-rounded" src="components.png" alt="Eine Webseite in Komponenten zerlegt und in Form einer Baumstruktur in Beziehung zueinander gebracht."></a>

Weitere Informationen dazu finden sich in der offiziellen [Vue Dokumentation](https://v2.vuejs.org/v2/guide/#Composing-with-Components){:target="_blank"}.

## Was verbirgt sich hinter der Composition API?
Das Wichtigste vorweg: Die neue API ist rein additiv, bricht vorhandenen Code nicht und muss darüber hinaus auch gar nicht verwendet werden!
Es kann weiterhin mit der Options API gearbeitet werden. Die neue Composition API ist lediglich eine Erweiterung des bestehenden Frameworks, um Einschränkungen von Vue 2.x zu beheben, die speziell bei großen Anwendungen aufkamen.
Die Composition API bietet eine Möglichkeit, die aus Vue bekannte [Reactivity](https://v2.vuejs.org/v2/guide/reactivity.html){:target="_blank"} in allen Teilen der Anwendung nutzbar zu machen, ohne dabei die Organisation und Lesbarkeit zu beeinträchtigen.

Im Grunde genommen fügt die Composition API dem Framework nichts Neues hinzu. Sie stellt uns einige der ursprünglich lediglich intern verwendeten Funktionen zur Verfügung, um diese direkt innerhalb und außerhalb von Komponenten nutzen zu können.

Der Begriff _Composition_ beschreibt dabei einen weiteren wesentlichen Teil, nämlich den vereinfachten Aufbau von Komponenten. Es handelt sich bei der neuen Composition API um eine Möglichkeit, wie Teile zusammengesetzt werden können, damit am Ende eine Komponente entsteht.

## Warum die neue Composition API?
Mit zunehmender Größe und Komplexität sind Vue-Projekte und speziell die darin befindlichen Komponenten bislang schwer zu warten und verwalten gewesen. In Vue 2.x werden Komponenten mithilfe verschiedener Optionen (_data_, _methods_, _computed_,...) organisiert, daher der Begriff _Options API_.
Zusätzlich dazu existieren noch eine Vielzahl sogenannter _Lifecycle_-Methoden, die ebenfalls hinzugenommen werden können, um auf bestimmte Situationen reagieren und sogar eingreifen zu können.

Aufgrund dieser Einteilung sind Komponenten mit steigender Größe schwer zu lesen, da man häufig zwischen den einzelnen Abschnitten hin und her springt, um die Funktionsweise nachvollziehen zu können.
Ein weiterer Nachteil dieser Organisation ist, dass sie die Wiederverwendung von Code erschwert, da ein Feature über die gesamte Datei verstreut sein kann. Es existieren zwar diverse Lösungsmöglichkeiten, welche aber wiederum eigene Nachteile mit sich bringen.

Die [offizielle Vue Dokumentation](https://vuejs.org/guide/extras/composition-api-faq.html#better-logic-reuse){:target="_blank"} enthält dieses ausgezeichnete Diagramm, welches die Zusammengehörigkeit verschiedener Features in derselben Komponente durch die Verwendung unterschiedlicher Farben sichtbar macht:

<a href="https://vuejs.org/guide/extras/composition-api-faq.html#better-logic-reuse" target="_blank"><img class="img-fluid center img-rounded" src="component-feature-structure.png" alt="Die Zusammengehörigkeit verschiedener Features in derselben Komponente durch die Verwendung verschiedener Farben sichtbar gemacht."></a>

Als weiterer wichtiger Punkt ist der aktuelle TypeScript-Support zu nennen. Die Options API beruht auf einer Menge "Magie" des Vue-Compilers, wodurch sich die Verwendung von `this` innerhalb von Komponenten nur sehr schwierig mit TypeScript verbinden lässt.
Die Composition API ist aufgrund Ihrer Struktur und Simplizität frei von diesen Nachteilen, sodass sie sich wie in JavaScript erwartet verhält. Dies ermöglicht eine viel bessere TypeScript-Unterstützung bei der Verwendung der Composition API.

## Vue 3
Es existieren verschiedene Möglichkeiten, Vue 3 zu installieren.
Das Team von Vue bietet ein offizielles [CLI](https://cli.vuejs.org){:target="_blank"} an, um Anwendungen aufzusetzen. Da dies in der Regel der optimale Weg ist, gehen wir ebenso vor.
Zu Beginn installieren wir das CLI zum Beispiel über den [Node Package Manager](https://www.npmjs.com/get-npm){:target="_blank"}:

```shell
npm install -g @vue/cli@next
```

Das Erstellen eines neuen Projektes erreichen wir über die folgende Zeile:

```shell
vue create vue-3-tutorial
```

Als Preset wählen wir hier **Default (Vue 3 Preview)**. Daraufhin findet das Aufsetzen und Konfigurieren unseres neuen Projektes statt. Sobald der Vorgang abgeschlossen ist, werden auch schon die nächsten Schritte zum Ausführen der Vue Anwendung angezeigt:

```shell
cd vue-3-tutorial
yarn serve
# OR
npm run serve
```

Im Browser lässt sich die laufende Anwendung über die angezeigte URL aufrufen, welche standardmäßig [http://localhost:8080/](http://localhost:8080/){:target="_blank"} lautet.

### 1. Bootstraping der Anwendung
Die Art und Weise, wie eine neue Vue-Anwendung erstellt wird, hat sich mit Version 3 geändert. Dazu schauen wir uns die Datei `src/main.js` einmal mit einem beliebigen Editor genauer an.

```javascript
import { createApp } from 'vue';
import App from './App.vue';

createApp(App).mount('#app');
```

Anstatt mit `new Vue` wird jetzt die `createApp` Funktion verwendet, welche zunächst importiert werden muss.
Der Funktion wird als erster Parameter unsere Root-Komponente, also die Wurzel unserer Anwendung, übergeben.
Die Komponente kann hier definiert oder wie in der Beispielanwendung (`App.vue`) importiert werden.
Mittels `mount`-Aufruf und der Übergabe eines CSS-Selektors, teilen wir Vue mit, wo unsere Anwendung beziehungsweise Komponente im DOM gemountet werden soll.

Die HTML-Datei mit dem Element der ID _app_ findest du unter `public/index.html`. Sobald der Browser die HTML-Datei und die zugehörigen Ressourcen heruntergeladen und ausgeführt hat, wird unsere Vue-Anwendung in das Div-Element mit der ID _app_ geladen.

### 2. Erste Komponente erstellen
Wir erstellen eine einfache Komponente zur Addition zweier Zahlen. Das vorläufige Ergebnis sieht so aus:

<img class="img-fluid center img-rounded" src="tutorial-result.png" alt="Das Ergebnis der hier umgesetzten Komponente, besteht aus zwei Eingabefeldern und einem Button, um die Addition auszulösen.">

Im `components`-Ordner erstellen wir dafür zunächst eine neue Datei mit dem Namen `Calculator.vue`:

```vue
<template>
    <h3>Calculator</h3>
    <form>
        <input type="number">
        <input type="number">
        <button type="submit">
            Add
        </button>
    </form>
    <p>Result: </p>
</template>
<script></script>
<style></style>
```

#### 1. Der Aufbau einer Komponente
Der Aufbau der Datei folgt dem bekannten [Single-File-Component](https://v2.vuejs.org/v2/guide/single-file-components.html){:target="_blank"}-Schema, welches de facto der Standard für Vue Anwendungen ist.

Das `template` stellt das zu rendernde HTML der Komponente dar und kann unter anderem mit [Directives](https://v2.vuejs.org/v2/guide/syntax.html#Directives){:target="_blank"} und [Interpolations](https://v2.vuejs.org/v2/guide/syntax.html#Interpolations){:target="_blank"} angereichert werden, um die Logik abzubilden.
Nach diesem Prinzip arbeiten nahezu alle Template-Engines.

Der `script`-Teil wird für die "komplexere" JavaScript-Logik der Komponente verwendet und ermöglicht es, diese zu konfigurieren.

Im `style`-Tag werden schließlich die CSS-Regeln für diese Komponente hinterlegt. Verwendet man allerdings nicht das Attribut [scoped](https://v2.vuejs.org/v2/guide/comparison.html#Component-Scoped-CSS){:target="_blank"}, so beziehen sich dort angegebene Regeln auf die gesamte Anwendung. Es bietet sich an, eine weiterführende Methodik wie [BEM](http://getbem.com/introduction/){:target="_blank"} einzusetzen.
Da dies aber den Umfang dieses Tutorials sprengen würde, entfernen wir im Folgenden die `style`-Tags und kümmern uns lediglich um die Logik der Komponente.

#### 2. Schreiben des `script`-Teils

Unsere Komponente benötigt drei Variablen. `num1` und `num2` werden für die Eingabewerte des Benutzers benötigt, `sum` beinhaltet das Ergebnis der Addition. Über die `data`-Option können wir einer Komponente mehrere Zustandsvariablen zuweisen.

Dazu erweitern wir den `script`-Teil der Datei wie folgt:

```javascript
export default {
  data() {
    return {
      num1: 0,
      num2: 0,
      sum: 0,
    };
  }
}
```

Um die Addition auszuführen, verwenden wir noch eine Methode. Diese wird in der Option `methods` deklariert. Die Funktion darf nicht als [arrow function](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Functions/Pfeilfunktionen){:target="_blank"} geschrieben werden, da wir sonst den Bezug zu `this` verlieren.

```javascript
export default {
  data() {
    return {
      num1: 0,
      num2: 0,
      sum: 0,
    };
  },
  methods: {
    add: function () {
      this.sum = parseInt(this.num1, 10) + parseInt(this.num2, 10);
    }
  }
}
```

An diesem Beispiel sehen wir auch die Verwendung von `this`. Der Vue-Compiler kümmert sich darum, dass Optionen über `this` aufeinander zugreifen können und alle in `data` definierten Variablen auch initialisiert werden, wodurch sie dem Kontext zur Verfügung stehen.

Werte in Eingabefeldern werden immer als String repräsentiert. Daher benötigen wir die Methode [parseInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt){:target="_blank"}. Diese konvertiert die Eingabewerte in Zahlen.
Der zweite Parameter sollte immer verwendet werden, da dieser das zugrundeliegende Zahlensystem für die Konvertierung vorgibt. `10` steht für das gebräuchliche Dezimalsystem.

Damit ist der `script`-Teil zunächst fertig. Als Nächstes geht es darum, die Steuerung der Anzeige ins Template zu integrieren.

#### 3. Die Anreicherung des `template`-Teils

Als Erstes kümmern wir uns um die Ausgabe des Ergebnisses `sum`, da es sich hierbei lediglich um eine einfache Textinterpolation handelt. Als Syntax verwendet Vue die sogenannte _Mustache_-Syntax, die mit zwei geschweiften Klammern geschrieben wird:

```html
<template>
    <h3>Calculator</h3>
    <form>
        <input type="number">
        <input type="number">
        <button type="submit">
            Add
        </button>
    </form>
    <p>Result: {{ sum }}</p>
</template>
```

Der Vue-Compiler rendert an die Stelle von `sum` den Inhalt der Variablen aus `data`. Genau genommen passiert hier aber noch mehr. Als Nutzer des Frameworks erhalten wir out of the box eine [Reaktivität](https://v2.vuejs.org/v2/guide/reactivity.html){:target="_blank"} der Eigenschaften.
Alles, was in `data` definiert wird, erhält automatisch einen Watcher zugeteilt. Dadurch wird bei Änderungen der dort definierten Variablen ein Re-Rendering des Templates ausgelöst.

Neben der Ausgabe einer aktuell noch unveränderlichen Summe der Addition sollten wir uns nun viel mehr um die Verknüpfung der Eingabefelder mit unseren anderen beiden Variablen `num1` und `num2` kümmern.

Die Template-Engine bietet uns dafür sogenannte Direktiven an, welche Seiteneffekte auf das DOM anwendet. Diese speziellen Direktiven beginnen immer mit dem Präfix `v-` und dürfen als Wert lediglich einfache JavaScript-Ausdrücke beinhalten.

Für unseren Anwendungsfall benötigen wir eine Möglichkeit, eine bidirektionale Bindung zwischen dem Eingabefeld und der zugehörigen Variable zu erstellen. Vue bietet uns hierfür die `v-model`-Direktive an:

```html
<template>
    <h3>Calculator</h3>
    <form>
        <input type="number" v-model="num1">
        <input type="number" v-model="num2">
        <button type="submit">
            Add
        </button>
    </form>
    <p>Result: {{ sum }}</p>
</template>
```

Vue sorgt dann dafür, dass die Eingaben des Users in das Eingabefeld in der jeweiligen Variable reflektiert werden. Codeseitige Änderungen an den Variablen führen ebenfalls dazu, dass die Eingabefelder im Browser entsprechend aktualisiert werden.

Letztlich fehlt noch die Ausführung der Addition beim Anklicken des Buttons.
Wir können die `v-on`-Direktive verwenden, um mit einem [Event Listener](https://developer.mozilla.org/de/docs/Web/API/EventTarget/addEventListener) auf DOM-Events zu lauschen. Beim Auslösen des Events wird der angegebene JavaScript-Code ausgeführt.
Die Art des Events wird hinter einem Doppelpunkt angegeben.

```html
<template>
    <h3>Calculator</h3>
    <form v-on:submit.prevent="add">
        <input type="number" v-model="num1">
        <input type="number" v-model="num2">
        <button type="submit">
            Add
        </button>
    </form>
    <p>Result: {{ sum }}</p>
</template>
```

Bei einem Klick auf den Button wollen wir unsere `add`-Methode ausführen, um `sum` den Wert der Addition von `num1` und `num2` zuzuweisen. Dadurch wird ein Re-Rendering der Komponente ausgelöst, wodurch `sum` im Template den neu berechneten Wert anzeigt.

Ein HTML-Formular, welches einen `button` vom Typ `submit` beinhaltet, wird durch Klicken automatisch abgesendet.
Alternativ kann das Formular auch mit _Enter_ abgeschickt werden, was aus Gründen der [Barrierefreiheit](https://developer.mozilla.org/de/docs/Learn/Accessibility) die bessere Lösung darstellt.
Insofern ist es nicht notwendig, einen Klick-Listener auf den Button selbst zu setzen, sondern das `submit`-Event auf dem Formular abzufangen.

Das Standardverhalten des Browsers führt beim Absenden eines Formulars zu einer Weiterleitung auf die im Formular angegebene `action`.
Wir wollen das Formular und die eingegebenen Daten im JavaScript-Code auf der aktuellen Seite behandeln und keine Weiterleitung an eine andere URL auslösen. Deshalb verhindern (engl. _to prevent_) wir das Standardverhalten an dieser Stelle.

[Modifikatoren](https://v2.vuejs.org/v2/guide/events.html#Event-Modifiers) können über eine Punktnotation an einen Event-Listener angehängt werden, um automatisch die damit zusammenhängende Logik auszuführen.
In unserem Fall ist es `prevent`, welches das Standardverhalten des Events verhindert, bevor es schließlich unsere `add`-Methode aufruft. Wird das Formular abgesendet, verhindern wir die Weiterleitung und geben das Event stattdessen an die angegebene JavaScript-Funktion weiter.

Die Direktive `v-on` kann und sollte für eine bessere Lesbarkeit durch das Zeichen `@` ersetzt werden, sodass wir `@submit.prevent="sum"` erhalten.

#### Multi-Root Templates

Seit Vue 3 ist es dank einer Funktion namens _Fragments_ nicht mehr zwingend erforderlich, nur ein einziges Wurzelelement im `template` zu haben.
Diese Änderung führt dazu, dass der oben gezeigte Code nun endlich valide ist und nicht noch extra ein umschließendes `div`-Element hinzugefügt werden muss, wie es in Vue 2.x noch der Fall war.

### 3. Einbinden unserer Komponente

Um unsere Komponente testen zu können, müssen wir diese in unserer Anwendung einbinden und verwenden. Dafür öffnen wir `src/App.vue` und importieren zunächst unsere Komponente, indem wir im `script`-Teil über den `export` die folgende Zeile hinzufügen:

```javascript
import Calculator from './components/Calculator.vue';
```

Unsere Komponente registrieren wir nun als solche und machen sie der Anwendung bekannt. Dafür bietet die Options API eine weitere Eigenschaft, nämlich `components`.

Die Option `components` ist ein Objekt, welches als Key den Namen des Tags und als Wert die Komponente beziehungsweise das Konfigurationsobjekt derselben beinhaltet:

```javascript
export default {
  name: 'App',
  components: {
    Calculator
  }
}
```

Hier verwenden wir die [Kurzschreibweise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#Property_definitions){:target="_blank"}, welche seit ECMAScript 2015 (ES6) verwendet werden kann, indem wir lediglich `Calculator` angeben.

Im `template`-Teil unserer Root-Komponente `App.vue` können wir nun an beliebiger Stelle `<Calculator />` verwenden, um dort unsere Komponente rendern zu lassen:

```html
<template>
  <div id="app">
    <Calculator />
  </div>
</template>
```

Durch die hier verwendete Art der Komponentenregistrierung, können wir die Komponente in Single-File-Components (**SFC**) sowohl im [Kebab Case](https://wiki.c2.com/?KebabCase){:target="_blank"} (`calculator`) als auch im [Pascal Case](https://wiki.c2.com/?PascalCase){:target="_blank"} (`Calculator`) schreiben.

Normalerweise ist Kebab Case vorzuziehen, da diese Schreibweise dem W3C-Standard entspricht und HTML [case-insensitive](https://html.spec.whatwg.org/multipage/syntax.html){:target="_blank"} ist. Das heißt, es wird nicht zwischen Groß- und Kleinschreibung unterschieden.
Da wir aber ohnehin SFCs verwenden und diese vorher noch durch den Compiler verarbeitet werden, empfiehlt es sich in Vue Anwendungen unter anderem aus folgenden Gründen die Pascal Case Schreibweise zu verwenden:

* Code-Editoren können Komponentennamen automatisch vervollständigen, da die Pascal Case Schreibweise auch im JavaScript verwendet wird.
* `<MyComponent />` unterscheidet sich visuell mehr von Standard HTML-Elementen als `<my-component />`, da es durch die Großbuchstaben mehr heraussticht.

Wie genau Vue intern funktioniert und _was_ letztlich von unseren Single-File-Components _wie_ im Browser landet, kann [hier](https://medium.com/js-imaginea/the-vue-js-internals-7b76f76813e3){:target="_blank"} und [hier](https://v2.vuejs.org/v2/guide/render-function.html){:target="_blank"} nachgelesen werden.

### 4. Die Vue DevTools

Bei der Arbeit mit Vue gehören neben den kennengelernten Werkzeugen unbedingt auch die Vue DevTools. Es handelt sich dabei um ein Add-On für den Chrome- oder Firefox-Browser, welches die Entwicklertools um einen zusätzlichen Bereich für Vue erweitert. Dieser stellt uns viele Informationen über die Anwendung und die verwendeten Vue-Komponenten bereit.

* [Vue DevTools für Chrome](https://chrome.google.com/webstore/detail/vuejs-devtools/ljjemllljcmogpfapbkkighbhhppjdbg){:target="_blank"}
* [Vue DevTools für Firefox](https://github.com/vuejs/vue-devtools/releases/download/v6.0.0-beta.2/vuejs_devtools_beta-6.0.0.2-an+fx.xpi){:target="_blank"}

Nach der Installation und einem Neustart des Browsers können wir über die Tastenkombination [**Cmd+Option+I**] (Mac) oder [**Strg+Shift+I**] (Windows) die Entwicklertools öffnen. In der Liste der Reiter suchen wir den Eintrag **Vue** und klicken diesen an:

<img class="img-fluid" src="vue-devtools.png" alt="Eine Ansicht der Vue-Devtools für unsere aktuelle Vue-Anwendung.">

In der Abbildung sehen wir links den Komponentenbaum, welcher die Komponente `App` und darunter unsere selbsterstellte Komponente `Calculator` enthält.
Im rechten Bereich sehen wir Detailinformationen zu der ausgewählten Komponente.

## Refactoring mit der Composition API

Zu Demonstrationszwecken soll diese recht überschaubare Komponente zunächst reichen. Neben einigen anderen Neuerungen von Vue 3, wollen wir uns jetzt mit der Composition API auseinandersetzen.

Die neue API ermöglicht uns, Komponenten mit einer `setup`-Funktion zu definieren, anstatt mit einem großen Objekt, welches aus vorgegebenen Keys (Optionen) besteht.
Zunächst wollen wir uns ein Refactoring der zuvor erstellen Komponente mit der Composition API ansehen, um daraufhin die letzte offene Frage des Artikels zu beantworten: Wie funktioniert die Composition API?

Die Funktionalität der Komponente wird durch das Refactoring nicht verändert und auch das Template bleibt hiervon vollkommen unberührt.
Wie wir gleich sehen werden, lässt sich der Rendervorgang nicht durch die Art und Weise der Logik-Definition beeinflussen.

### 1. Umschreiben von Komponentenlogik

Wie oben angeführt, reduziert sich mit der Composition API die Art der Konfiguration einer Komponente von einem großen Objekt auf eine `setup`-Funktion. Demzufolge starten wir zunächst mit einem Refactoring in folgendem Schema:

```javascript
export default {
  setup() {
  }
}
```

Da Vue sich mit der Composition API wieder mehr an die klassische Arbeitsweise von JavaScript-Entwicklern annähern soll, deklarieren wir die benötigten Variablen und Funktionen innerhalb der `setup`-Funktion wie folgt:

```javascript
export default {
  setup() {
    const num1 = ref(0);
    const num2 = ref(0);
    const sum = ref(0);

    function add() {
      sum.value = parseInt(num1.value, 10) + parseInt(num2.value, 10);
    }
  },
}
```

Prinzipiell sieht der vorhandene Code bereits jetzt nach gewohntem JavaScript aus, welcher nicht framework-agnostisch zu sein scheint. Wir benutzen zwar `ref` und müssen die Zuweisung der Variable über die Anweisung `.value` vornehmen, nichts davon ist allerdings untypisch für JavaScript.

Geändert hat sich außerdem, dass wir `this` nicht mehr verwenden, um Variablen zu referenzieren.
Durch die direkte Verwendung der API-Funktionen (`ref`) anstatt über die Optionen wie im vorherigen Beispiel, wird die sonst im Framework stattfindende Magie wegabstrahiert.

Um den Code lauffähig zu bekommen, müssen wir `ref` natürlich noch importieren, und zwar direkt aus Vue heraus:

```javascript
import { ref } from 'vue';

export default {
  setup() {
    const num1 = ref(0);
    const num2 = ref(0);
    const sum = ref(0);

    function add() {
      sum.value = parseInt(num1.value, 10) + parseInt(num2.value, 10);
    }
  },
}
```

Damit ist das Refactoring auch schon fast abgeschlossen. Jetzt weisen wir dem Template nur noch die Variablen und Funktionen zu.

Das Vorgehen ist dasselbe wie bei anderen Funktionen, denn `setup` ist ebenfalls nur eine einfache JavaScript-Funktion. Alle definierten Eigenschaften lassen sich mittels eines `return`-Statements zurückgeben.

```javascript
import { ref } from 'vue';

export default {
  setup() {
    const num1 = ref(0);
    const num2 = ref(0);
    const sum = ref(0);

    function add() {
      sum.value = parseInt(num1.value, 10) + parseInt(num2.value, 10);
    }

    return {
      num1,
      num2,
      sum,
      add,
    };
  },
}
```

Wechseln wir nun zurück in den Browser, sollten wir weiterhin die bereits bekannte Funktionsweise vorfinden.

## Wie funktioniert die Composition API?

Die gesamte Reaktivität, welche sonst vom Framework hinter den Kulissen gehandhabt und uns als Nutzer out of the box nahezu magisch zur Verfügung gestellt wird, ist nun mittels einzelner exportierter Funktionen nutzbar.

Im Beispiel sehen wir die Verwendung von `ref`. Auf diese Art machen wir die Variable nun sozusagen händisch **reaktiv**. Die Funktion `ref` akzeptiert einen Wert und gibt daraufhin eine [Reactive Reference](https://vuejs.org/api/reactivity-core.html){:target="_blank"} zurück.
Das Konzept, mit solchen Referenzen zu arbeiten, zieht sich durch die gesamte Composition API. Für Webentwickler ist es wichtig, die grundlegende Funktionsweise zu verstehen.
Eine ausführliche Beschreibung findet sich unter anderem in folgendem Artikel: [Die Composition API](https://vuejs.de/artikel/composition-api-teil-1/){:target="_blank"}.

[Primitiven Datentypen in JavaScript](https://developer.mozilla.org/de/docs/Glossary/einfache_datenelemente){:target="_blank"} (im Wesentlichen non-`objects`, wie z.B. ein `string`) werden als Kopie und nicht als Referenz übergeben.
Das sorgt dafür, dass Referenzen beim Übergeben an Funktionen "verloren" gehen und somit keine Reaktivität abgebildet werden kann. `ref` hingegen erzeugt aus dem initialen Wert ein Objekt und ermöglicht somit, die Werte als Referenz übergeben zu können.

Das zurückgegebene Objekt von `ref` verfügt lediglich über eine einzelne Eigenschaft: `value` verweist auf den eigentlichen Wert einer Referenz und kann gleichzeitig auch als Setter verwendet werden, wie wir oben am Beispiel der Funktion `add` sehen.

Dem interessierten Leser ist vielleicht aufgefallen, dass `.value` ausschließlich im JavaScript-Code verwenden, nicht aber im Template selbst. Das liegt daran, dass der Vue-Compiler im Template das _Unwrapping_, also das Auspacken des Wertes, automatisch vornimmt.

### `ref` vs. `reactive`

Einfacher ist es, wenn direkt mit einem Objekt gearbeitet wird, da hier die Problematik mit der Weitergabe von Referenzen aus den genannten Gründen nicht existiert. Würden wir demnach nicht drei einzelne Variablen erzeugen, sondern mit einem einzigen Objekt arbeiten, ließe sich die Besonderheit mit `.value` wie folgt umgehen:

```javascript
import { reactive } from 'vue';

export default {
  setup() {
    const state = reactive({
      num1: 0,
      num2: 0,
      sum: 0,
    });

    function add() {
      state.sum = parseInt(state.num1, 10) + parseInt(state.num2, 10);
    }

    return {
      state,
      add,
    };
  },
}
```

Im Template müssten die Verwendungen der Variablen noch entsprechend mit dem Präfix `state.` versehen werden, da diese nun im `state` Objekt gekapselt sind.

Die Funktion `reactive` ist quasi das Pendant zu `ref` für Objekte. Es akzeptiert ein Objekt und gibt einen Proxy für dieses Objekt zurück, welches getrackt wird.
Hier ist der Umweg über `.value` nicht notwendig, da Objekte in JavaScript ohnehin per Referenz übergeben werden und somit kein Wrapper mehr erzeugt werden muss.

Für den weiteren Verlauf des Tutorials werden wir mit `ref` weiterarbeiten.

## Das Konzept der `computed properties`

Wie eingangs bereits erwähnt, bietet die Composition API dem Entwickler eine Alternative für die Erstellung von Komponenten.
Zuvor haben wir uns die Grundkonzepte und die Struktur zum Schreiben von Komponente mit der Options API und der Composition API angeschaut.
Das Vorgehen zur Berechnung der Summe ist hier mithilfe eines Klick-Listeners und einer Funktion nicht optimal gelöst. Für diese Zwecke bietet Vue uns eine wesentlich mächtigere Alternative, die wir uns in diesem Abschnitt anschauen wollen.

Mit sogenannten `computed properties` können Variablen definiert werden, deren Wert von anderen (nicht-)reaktiven Werten abhängt. Diese Variablen werden zur Laufzeit ausgewertet und aktualisiert, sobald sich einer der anderen Werte ändern sollte.

Die Composition API bietet uns auch hierfür eine eigene Funktion an;

```javascript
import { ref, computed } from 'vue';

export default {
  setup() {
    const num1 = ref(0);
    const num2 = ref(0);
    const sum = computed(() => parseInt(num1.value, 10) + parseInt(num2.value, 10));

    return {
      num1,
      num2,
      sum,
    };
  },
}
```

Die `computed`-Funktion gibt ein *immutable* (nicht veränderbares) `ref`-Objekt zurück, auf dessen Wert, ebenfalls mit `.value` zugegriffen werden kann. Als Parameter akzeptiert `computed` eine Funktion.
Wir verwenden eine [arrow function](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Functions/Pfeilfunktionen){:target="_blank"} in gekürzter Schreibweise, weshalb wir hier kein `return` benötigen, um das Ergebnis der Addition zurückzugeben.
`computed` kann auch ein Objekt mit einer Setter-Funktion akzeptieren, um es bei Bedarf veränderbar zu machen.

Vue sammelt alle im Body verwendeten Variablen als Abhängigkeiten ein und berechnet `sum` jedes Mal automatisch neu, sobald sich einer der Werte dieser Abhängigkeiten ändert. In unserem Falle sind das `num1` und `num2`.

Darüber hinaus wird der Wert gecacht und nur dann neu berechnet, wenn sich der Wert einer der gesammelten Abhängigkeiten tatsächlich ändert.
Das heißt, selbst wenn es aus einem anderen Grund zu einem Re-Rendering der Komponente kommt, ist Vue schlau genug, um die `computed properties` nicht neu zu berechnen und einfach den zuvor gespeicherten Wert auszugeben.

Im Gegensatz dazu wird eine einfache Funktion jedes Mal ausgeführt, da hier kein Dependency Tracking stattfindet.

Aufgrund der vorgenommenen Änderungen können wir das Template wie folgt verändern:

```html
<template>
    <h3>Calculator</h3>
    <form>
        <input type="number" v-model="num1">
        <input type="number" v-model="num2">
    </form>
    <p>Result: {{ sum }}</p>
</template>
```

Wie wir sehen, benötigen wir weder den Button noch den Event-Listener, da Vue aufgrund der Reaktivität der Variablen und Abhängigkeiten der `computed property` automatisch die Komponente neu rendert, sobald wir eines der Eingabefelder editieren.

### `computed` mithilfe der Options API

In einer klassischen Vue-Komponente würden wir eine `computed property` wie folgt schreiben:

```javascript
export default {
  data() {
    return {
      num1: 0,
      num2: 0,
    };
  },
  computed: {
    sum() {
      return parseInt(this.num1, 10) + parseInt(this.num2, 10);
    }
  }
}
```

Mit `computed` sehen wir eine weitere Option des Konfigurationsobjektes aus der Options API. Wir haben `sum` als Variable aus `data` entfernt und in `computed` verschoben.
Es handelt sich wiederum um ein Objekt, in welchem `computed properties` als Funktionen definiert werden.

Entgegen der Syntax verwenden wir `sum` allerdings auch hier weder im `script`- noch im `template`-Teil als Funktionsaufruf in der Schreibweise `sum()` sondern wie eine normale Variable `sum`.

## Vereinfachter Aufbau von Komponenten

Einleitend zur Composition API wurde die bessere Code-Organisation und die Wiederverwendung von Sourcecode zwischen Komponenten als ein weiterer großer Pluspunkt der neuen API genannt.

Die in diesem Tutorial erstellte Komponente schöpft das Potenzial der Composition API in dem Bereich noch nicht vollkommen aus, da wir lediglich den Aufbau der Komponente verändert haben.
Den Nutzen der Composition API im Hinblick auf die Wiederverwendbarkeit von JavaScript-Logik erkennen wir besser, wenn größere Komponenten erstellt werden oder sobald es nötig wird Features über Komponenten hinweg zu teilen.

Um den Rahmen dieses Tutorials nicht zu sprengen und dennoch einen Eindruck der besseren Code-Organisation vermitteln zu können, werden wir uns eines nicht ganz optimalen Beispiels bedienen müssen.

### Hinzufügen weiterer Funktionalitäten

Wird alles in die `setup`-Methode verschoben, haben wir nicht wirklich viel gewonnen.

Zumindest könnte man so argumentieren.

Allerdings ist das Gegenteil der Fall.

Die `setup`-Methode führt keine Magie mehr im Hintergrund aus. Wir haben sämtliche Logik aus einfachen JavaScript-Konstrukten mit kleineren Funktionen aus dem Framework angereichert und aufgebaut.
Dadurch stehen uns auch alle Möglichkeiten zur Strukturierung und Aufteilung in Teilfunktionen zur Verfügung.

Dafür erweitern wir unseren `Calculator` um ein weiteres Feature, welches von der eigentlichen Berechnung unabhängig ist.
Wir wollen die [numbers api](http://numbersapi.com){:target="_blank"} verwenden, um uns zu dem errechneten Ergebnis interessante Fakten anzeigen zu lassen.

Jedes Mal, wenn `sum` neu berechnet wird, wollen wir weitere Logik ausführen lassen. Auch hierfür hat Vue mit [watchEffect](https://v3.vuejs.org/api/computed-watch-api.html#watcheffect){:target="_blank"} eine Lösung parat.
Ähnlich zu den `computed properties` können wir auch hier wieder eine Funktion hinterlegen, welche Vue analysiert und alle reaktiven Bestandteile als Abhängigkeiten sammelt.
Die angegebene Funktion wird sofort ausgeführt und automatisch immer wieder dann, wenn sich ein oder mehrere Abhängigkeiten verändern.

```javascript
import {computed, ref, watchEffect} from 'vue';

export default {
  setup() {
    const num1 = ref(0);
    const num2 = ref(0);
    const fact = ref('');
    const sum = computed(() => parseInt(num1.value, 10) + parseInt(num2.value, 10));

    watchEffect(async () => {
      const res = await fetch(`http://numbersapi.com/${sum.value}`);
      fact.value = await res.text();
    });

    return {
      num1,
      num2,
      sum,
      fact,
    };
  },
}
```

Mit `fact` haben wir eine neue reaktive Eigenschaft hinzugefügt.
Da wir innerhalb von `watchEffect` `sum.value` verwenden, registriert Vue `sum` als Abhängigkeit des Effekts und führt die angegebene Funktion jedes Mal neu aus, wenn sich der Wert ändert.

Mit dem Beispiel sehen wir auch den Unterschied zu `computed properties`. Da wir hier erst asynchrone Operationen wie den API-Aufruf ausführen müssen, woraufhin weitere Seiteneffekte angestoßen werden, müssen wir uns `watchEffect` zunutze machen.
`computed properties` sind schließlich für die Definition von berechneten Variablen zuständig, welche selbst keine weiterführenden Logiken ausführen.

Innerhalb der Funktion nutzen wir die API und übergeben als Parameter die berechnete Summe. Das Template ergänzen wir nun noch um die Ausgabe des Ergebnisses der API:

```html
<template>
    <h3>Calculator</h3>
    <form>
        <input type="number" v-model="num1">
        <input type="number" v-model="num2">
    </form>
    <p>Result: {{ sum }}</p>
    <strong>{{ fact }}</strong>
</template>
```

Dasselbe Verhalten hätten wir so auch mit der Options API umsetzen können, weshalb wir uns nun die Aufteilung in Teilfunktionen anschauen wollen und damit die Frage nach der Wiederverwendbarkeit der Composition API beantworten.

### Zusammensetzen einer Komponente aus `composition functions`

Unsere Komponente besteht ganz offensichtlich aus zwei unterschiedlichen Features. Aus diesem Grund unterteilen wir unsere Komponente in einzelne Dateien. Anschließend können wir diese in die `setup`-Funktion der Komponente importieren und verwenden.

Unter `src` legen wir dazu den Ordner `modules` mit den beiden Dateien an:

* `use-addition.js` und
* `use-api.js`

Es handelt sich um keine feste Vorgabe, allerdings um eine Art Konvention, dass man solche wiederverwendbaren `composition functions` mit dem Präfix `use` versieht.

In `use-addition.js` lagern wir nun die für unsere Berechnung benötigte Logik aus:

```javascript
import { ref, computed } from 'vue';

export default () => {
  const num1 = ref(0);
  const num2 = ref(0);
  const sum = computed(() => parseInt(num1.value, 10) + parseInt(num2.value, 10));

  return {
    num1,
    num2,
    sum,
  };
};
```

`use-api.js` beinhaltet die erst kürzlich hinzugefügte Logik für die Anfrage an die API:

```javascript
import { ref, watchEffect } from 'vue';

export default (sum) => {
  const fact = ref('');

  watchEffect(async () => {
    const res = await fetch(`http://numbersapi.com/${sum.value}`);
    fact.value = await res.text();
  });

  return {
    fact,
  };
};
```

Diese Arten von Funktionen nennt man `composition functions`, welche ein zentrales Konzept der Composition API sind.

Wir können in unseren JavaScript-Dateien Vue-Konzepte wie die Reaktivität, `computed properties` und auch `watchEffect` verwenden, obwohl wir uns nicht im Kontext einer Komponente befinden.
Die Logik ist direkt klar erkennbar, da die Dateien klein und leicht lesbar sind.

Ebenfalls gewinnen wir durch die Aufteilung der Logik in einzelne Dateien die Möglichkeit, dass wir auch in anderen Komponenten oder an anderen Stellen der Anwendung diese `composition functions` jederzeit wiederverwenden können.
Dies wollen wir am Beispiel unserer `Calculator`-Komponente demonstrieren:

```javascript
import useAddition from '@/modules/use-addition';
import useApi from '@/modules/use-api';

export default {
  setup() {
    const { num1, num2, sum } = useAddition();
    const { fact } = useApi(sum);

    return {
      num1,
      num2,
      sum,
      fact,
    };
  },
};
```

Die `setup`-Methode ist auf ein absolutes Minimum reduziert. Die im Template benötigten Eigenschaften werden uns durch die ausgelagerten Funktionen zur Verfügung gestellt.
Zurückgeben müssen wir diese allerdings weiterhin mittels `return` in der Komponente selbst.

Mit [Destructuring](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Operators/Destrukturierende_Zuweisung){:target="_blank"} werden die Rückgaben der `composition functions` in ihre einzelnen Bestandteile zerlegt und in die angegebenen Variablen geschrieben.
Wie auch bei der Übergabe von `sum` an `useApi` würden wir hierbei ohne das Konzept der `refs` und `Reactive References` die gewünschte Funktionalität der Reaktivität nicht abbilden können und die Referenzen verlieren.

Durch dieses Konzept der Zusammensetzung von Komponenten erhalten wir eine wesentlich bessere Strukturierung und Wartbarkeit. Die Möglichkeit, Komponenten nun endlich nach Logik strukturieren zu können, ist erst mit der Composition API in diesem Ausmaß möglich.

## Fazit

In diesem Vue.js Online-Tutorial hast du gelernt, selbstständig eine Komponente mit Vue zu schreiben. Dabei hast du das grundlegende Konzept des Arbeitens in Vue kennengelernt.
Im Vergleich zur klassischen Schreibweise hast du gesehen, was die Composition API ist, warum sie notwendig ist und wie man damit eine Komponente erstellen kann.
Die Composition API ist bereits jetzt veröffentlicht und einsatzbereit. Du kannst sie über den Release Candidate von Vue 3 oder als Plug-in benutzen.
Diskutier gerne mit, ob sich die Composition API in deinen Augen lohnt. Möchtest du diese einmal selbst ausprobieren oder lieber weiter wie gewohnt mit der Options API arbeiten?
Tausche dich in unserem kostenfreien [Discord Chat](https://vuejs.de/discord) mit anderen Nutzern aus!

Wir arbeiten aktuell an vielen weiteren Artikeln zum Thema Vue.js, insbesondere die Neuerungen von Vue 3 werden wir auf dieser Seite näher beleuchten. Guck also regelmäßig bei uns vorbei, um alle Neuerungen als Erstes zu erfahren.
Viel Spaß beim Lernen!


Wenn du Unterstützung brauchst, schau dir doch an, wie unser Trainer David das Tutorial macht:
<iframe width="560" height="315" src="https://www.youtube.com/embed/pMr7P4QXj-E" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


<hr>
<div class="workshop-hint text-center">
  <div class="h3">Hat dir das Tutorial geholfen?</div>
  <div class="row mb-2">
    <div class="col-xs-12 col-md-6">
      <p> Wir bieten auch <a target="_blank" href="https://workshops.de/seminare-schulungen-kurse/vuejs-typescript?utm_source=vuejs_de&utm_campaign=tutorial&utm_medium=link&utm_content=text-buttom">Vue-Intesiv-Schulungen</a>        an, um dich möglichst effektiv in das Thema Vue zu begleiten. Im Kurs kannst Du die Fragen stellen, die Du nur
        schlecht googeln kannst, z.B. “Besserer Weg, um meine Applikation zu strukturieren?”. Wir können sie Dir beantworten.
      </p>
      <p class="text-center">
        <a target="_blank" href="https://workshops.de/seminare-schulungen-kurse/vuejs-typescript?utm_source=vuejs_de&utm_campaign=tutorial&utm_medium=button&utm_content=text-buttom">
          <button class="btn btn-danger">Jetzt weiter lernen</button>
        </a>
      </p>
    </div>
    <div class="col-xs-12 col-md-6">
      <img class="img-fluid img-rounded" src="workshops-attendees.png" alt="Teilnehmer:innen der Veranstaltung Vue-Intensiv-Workshop">
    </div>
  </div>
</div>
<hr>
