---
title: "Die Composition API in Vue.js 3 – Teil 1"
description: "Mit der Composition API hat sich viel in Vue.js 3 verändert. Was es alles Neues gibt, verraten wir Euch. Schaut gleich mal rein."
author: "Antony Konstantinidis"
published_at: 2020-11-17T11:00:00.000Z
categories: "vuejs advanced composition-api"
tutorial_page_order: "1"
header_image: "header.jpg"
---

**Mit der neuen Version des Javascript Frameworks Vue.js kamen auch viele Neuerungen und Veränderungen.
Eine davon ist die Composition API, die wir hier näher erläutern möchten.**

Mit den Jahren wurde Vue.js reicher an Funktionen und immer mehr Entwickler nutzten das Framework auch für größere Projekte – und das meist in Teams.
Die Folge: Die alte Vue API konnte mit den höheren Anforderungen nicht mehr so gut mithalten. Der Code wurde unübersichtlich und bremste die Prozesse aus.
Das API-Konzept musste überdacht werden. Mit der neuen API sollte der User nun flexibler seinen Code gestalten können.
Statt den Code nur mit Optionen innerhalb eines großen JavaScript-Objektes zu organisieren, wie es bisher standardmäßig durch die Options-API gemacht wird,
kann der Code nun nach Funktionalitäten gebündelt geschrieben werden.

**Das heißt**: Dank der neuen Composition API können wir jetzt sich wiederholende Code-Fragmente aus einer Komponente herausnehmen
und diese als wiederverwendbaren Code in anderen Komponenten zur Verfügung zu stellen.
Allein dadurch profitieren Entwickler bereits von einer besseren Wartung und Flexibilität.

## Warum brauchen wir die Composition API?

Der Aufbau einer Vue Komponente sieht in der Regel wie folgt aus:

```javascript
export default {
  name: 'MyComponent',
  data: ...,
  computed: ...,
  methods: ...,
  watch: ...,
  ...
}
```

Meistens reicht es schon, wenn man Funktionalitäten mit Komponenten-Optionen (`data`, `computed`, `methods`, `watch`) organisiert.
Wenn die Liste der abzubildenden Funktionalitäten oder fachlichen Anforderungen in einer Komponente wächst, werden Komponenten unweigerlich größer.
Das führt zu Komponenten, die schwer lesbar und verständlich sind – vor allem für Entwickler, die den ursprünglichen Code nicht selbst geschrieben haben.

```javascript
export default {
  data() {
    return {
      // Feature A
      // Feature B
    };
  },
  methods: {
    // Feature B
    /*
      Feature A
               */
  },
  computed: {
    /*
      Feature B
      Feature B
      Feature B
               */
  },
  watch: {
    // Feature A
  },
};
```

Durch die Fragmentierung, die sich an den verschiedenen Bestandteilen eines Frameworks orientiert, wird es schwierig, eine komplexe Komponente zu verstehen und zu warten.
Zusätzlich muss der Entwickler, wenn er an einer einzelnen fachlichen Anforderung einer Komponente arbeitet, von einem Optionen-Block zum anderen springen, um den relevanten Code zu finden.

**Die Idee**: Statt Funktionalitäten über das gesamte Objekt und dessen Optionen zu verteilen, wodurch wir die Übersicht verlieren,
könnten wir einzelne, logisch zusammenhängende Code-Teile an einer Stelle verorten und damit sogar über Komponenten hinweg teilen.

Und das ist genau das, was die Composition API uns ermöglicht!

![Ein Vergleich der beiden APIs hinsichtlich der entstehenden Code-Fragmentierung.](options-vs-composition.png)

Im linken Teil der Grafik kann man gut erkennen, wie eine große Komponente mit verschiedenen Features (farblich markiert) aussehen kann.
Rechts sehen wir, wie die optimierte Struktur mittels Composition API schließlich aufgebaut ist.

## Code-Beispiel

Anhand eines Beispiels wollen wir uns mit den Neuerungen der Composition API vertraut machen und die einzelnen Zusammenhänge besser verstehen.
Dazu schauen wir uns zunächst eine Komponente an, die mit der Options-API geschrieben ist und mehrere Aufgaben erledigt:

1. Die Anfrage an eine externe API, um passende Bilder zu einem Tag zu erhalten. Das Tag wird über eine `prop` an die Komponente übergeben. Beim Ändern des Tags sollte der Request erneut ausgeführt werden.
2. Die Bilder sollen über einen Suchstring `searchQuery` durchsucht werden können.
3. Das Filtern von Bilder mittels eines `filters` Objekts.

```javascript
export default {
  props: {
    tag: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      images: [],
      searchQuery: '',
      filters: { ... },
    };
  },
  methods: {
    fetchImages() { ... },
    updateFilters() { ... },
  },
  computed: {
    filteredImages() { ... },
    searchedImages() { ... },
  },
  watch: {
    tag: 'fetchImages',
  },
  mounted() {
    this.fetchImages();
  },
}
```

Unsere Vue Komponente bekommt hierfür, wie üblich, ein Options-Objekt, das die verschiedenen Eigenschaften der Komponente beschreibt.
Die Eigenschaften des Objekts sind jeweils für einen bestimmten Komponenten-Bereich verantwortlich.

Als `prop` erhalten wir mit `tag` das Tag, zu dem wir die Bilder anfragen wollen.

Zur Speicherung von Daten innerhalb unserer Komponente benötigen wir das Property `data`. Darin befindet sich ein Array aller Bilder (`images`), das anfangs leer ist.
Die Daten hierzu sollen erst beim Erstellen der Komponente über eine externe Schnittstelle angefragt werden.
Hierzu benötigen wir den Lifecycle-Hook `mounted`. Dieser steht innerhalb des Options-Objekts als Methode bereit.
Sobald die Komponente erstellt und in den DOM geladen (_mounted_) worden ist, wird auch der darin befindliche Code ausgeführt. Mehr dazu findet ihr unter [Lifecycle-Hooks](https://vuejs.org/guide/essentials/lifecycle.html).
Über ein Eingabefeld soll der User die Bilder durchsuchen können, dafür verwenden wir die Eigenschaft `searchQuery`.
Um die gefilterte Liste dem Nutzer anzuzeigen, nutzen wir eine `computed property`, die unter `filteredImages` zu finden ist.
Dadurch erreichen wir, dass die Liste jedes Mal neu berechnet wird, sobald sich einer ihrer Abhängigkeiten (`filter`, `images`) verändert.

Das Options-Objekt kann aber noch ganz andere Eigenschaften beinhalten. Für eine vollständige Liste empfehlen wir diesen [Link](https://vuejs.org/guide/typescript/options-api.html#typing-component-props).

## Nutzung der Composition API

**Wichtig:** Die Composition API wird standardmäßig mit Vue.js 3 ausgeliefert. Für Vue.js 2 ist sie als [Plugin](https://github.com/vuejs/composition-api) erhältlich.

Um mit der Composition API arbeiten zu können, benötigen wir als Erstes einen Platz dafür.
In einer Vue Komponente wird dieser Bereich als `setup` bezeichnet. Diese Option stand dem Konfigurationsobjekt von Komponenten vorher nicht zur Verfügung und wird somit um diese erweitert.
Das Besondere: Die neue `setup` Komponenten-Option wird ausgeführt, bevor die Komponente erstellt wird. Genauer noch umschließt `setup` den Aufruf von `created` und `beforeCreate`. Insofern sollte jeglicher Code, der sonst innerhalb dieser beiden Lifecycle-Hooks stehen würde, direkt in die `setup`-Methode geschrieben werden.

Wenn Ihr mehr über die `setup` Komponenten-Option erfahren möchtet, schaut Euch am besten dieses [Video](https://www.vuemastery.com/courses/vue-3-essentials/setup-and-reactive-references/) an.

**Doch Vorsicht:** Da die Komponenten-Instanz noch nicht erstellt, aber `setup` ausgeführt wurde, gibt es keinen Zugriff auf `this` in der `setup` Option. Und das bedeutet wiederum, dass (mit Ausnahme von `props`) Ihr keinen Zugang zu Optionen habt, die in der Komponente angegeben wurden, z. B. state (`data`), `computed properties` oder `methods`.
Der Zugriff auf `props` ist natürlich essenziell, weshalb wir diese als ersten Parameter in unserer `setup` Funktion hereinbekommen. Ihr möchtet mehr über [props und context beim setup](https://vuejs.org/api/composition-api-setup.html) erfahren?

### Das Teilen von Daten zwischen der Composition API und der restlichen Komponente

Da `setup` eine gewöhnliche Funktion ist, können wir hier natürlich auch das `return` Statement verwenden, um somit Dinge zurückgeben zu lassen. Alles, was wir per `return` aus dem `setup` zurückgeben, wird an die restlichen Komponentenoptionen weitergegeben. Das heißt also, wir können `setup` neben unseren anderen Optionen verwenden und in diesen auch auf Eigenschaften aus `setup` zugreifen.
Außerdem stehen uns sämtliche zurückgegebene Eigenschaften auch im `template`-Teil der Komponente zur Verfügung.

Hier seht Ihr beispielhaft, wie setup zur Komponente hinzugefügt wird:

```javascript
export default {
  props: {
    tag: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    console.log(props); // { tag: '' }

    return {}; // Alles, was hier zurückgegeben wird, steht dem Rest der Komponente zur Verfügung
  },
  // Weitere Optionen möglich
};
```

### Extraktion des ersten Features

Wir beginnen mit dem ersten logischen Teil und möchten die Bilder zu einem Tag von einer externen API holen.

> 1. Die Anfrage an eine externe API, um passende Bilder zu einem Tag zu erhalten. Das Tag wird über eine `prop an die Komponente übergeben. Beim Ändern des Tags sollte der Request erneut ausgeführt werden.

Hierfür benötigen wir:

- Eine Möglichkeit die Bilder zu speichern
- Die Funktion, um die Bilder vom Server abzurufen
- Die Rückgabe sowohl der Liste als auch der Funktion, damit andere Komponenten-Optionen und das Template darauf zugreifen können

Das könnte folgendermaßen aussehen:

```javascript
import fetchImagesFromAPI from "@/api/fetch-images";

export default {
  props: {
    tag: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    let images = [];

    async function fetchImages() {
      images = await fetchImagesFromAPI(props.tag);
    }

    return {
      images,
      fetchImages,
    };
  },
};
```

Leider funktioniert das noch nicht, da unsere `images` Variable nicht reaktiv ist.
Die Folge: Vue bekommt Änderungen, z.B. unsere spätere Zuweisung innerhalb von `fetchImages`, nicht mit und die Komponente wird nicht neu gerendert.
Im Vue 2 Kontext haben wir unsere Variablen in `data` definiert und damit genau diese Reaktivität automatisch und nahezu magisch ohne weiteres Zutun erhalten.
Um in Vue.js 3 eine Variable reaktiv zu machen, benötigen wir mit der Composition API eine neue Funktion namens `ref`.

### Reaktivität in Vue 3

Die `ref` Funktion ist sicherlich eine der wichtigsten Elemente in der Composition API. Dank dieser kann eine Variable reaktiv gemacht werden.

```javascript
import { ref } from "vue";

const count = ref(0);
```

`ref` übernimmt das Argument und gibt es in einem Objekt mit einer `value` Property zurück.
Dieses kann dann genutzt werden, um Zugriff auf den Wert der reaktiven Variablen zu erlangen oder diese zu verändern.

```javascript
import { ref } from "vue";

const count = ref(0);

console.log(count.value); // 0

counter.value += 1;
console.log(counter.value); // 1
```

Das wirkt auf den ersten Blick recht umständlich und gewöhnungsbedürftig.
Das Einschließen von Werten in einem Objekt ist allerdings essenziell, um ein einheitliches Verhalten über verschiedene Datentypen in JavaScript zu gewährleisten.
Der Grund: In JavaScript werden primitive Datentypen wie `Number` oder `String` per Kopie weitergegeben und nicht durch die Referenz.

Hierzu eine hervorragende Veranschaulichung von [penjee.com](https://blog.penjee.com/passing-by-value-vs-by-reference-java-graphical/):

![Unterschied pass by reference und pass by value](https://blog.penjee.com/wp-content/uploads/2015/02/pass-by-reference-vs-pass-by-value-animation.gif)

In JavaScript existieren neben den primitiven Datentypen auch sogenannte [strukturelle Typen](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures). Dazu gehört auch `object`, welches wir am häufigsten durch die Syntax `{}` verwenden. Dieser Datentyp wird entgegen der Funktionsweise von primitiven Datentypen per Referenz übergeben und nicht als Kopie. Als weiterführende Literatur hierzu empfehlen wir zum Beispiel [diesen Link](https://www.javascripttutorial.net/javascript-pass-by-value/).
Durch eine Weitergabe per Referenz lassen sich Objekte über Funktionsaufrufe mitnehmen und weiterverarbeiten (siehe oben).
Diese Funktionalität macht sich Vue.js zunutze, um auch primitive Typen reaktiv zu bekommen. Ein primitiver Typ wird also in einem Objekt eingeschlossen und wird somit von nun an auch per Referenz weitergegeben.

### Nutzung von ref in unserem Beispiel

Als Nächstes erstellen wir also eine reaktive `images` Variable:

```javascript
import { ref } from "vue";
import fetchImagesFromAPI from "@/api/fetch-images";

export default {
  props: {
    tag: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    let images = ref([]);

    async function fetchImages() {
      images.value = await fetchImagesFromAPI(props.tag);
    }

    return {
      images,
      fetchImages,
    };
  },
};
```

Sobald wir `fetchImages` aufrufen, wird das `images` Array verändert und das Komponenten-Template neu gerendert, um die Anpassungen anzuzeigen.

Insgesamt sollte unsere Komponente nun so aussehen:

```javascript
import { ref } from 'vue';
import fetchImagesFromAPI from '@/api/fetch-images';

export default {
  props: {
    tag: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    let images = ref([]);

    async function fetchImages() {
      images.value = await fetchImagesFromAPI(props.tag);
    }

    return {
      images,
      fetchImages,
    };
  },
  data() {
    return {
      searchQuery: '',
      filters: { ... },
    };
  },
  methods: {
    updateFilters() { ... },
  },
  computed: {
    filteredImages() { ... },
    searchedImages() { ... },
  },
  watch: {
    tag: 'fetchImages',
  },
  mounted() {
    this.fetchImages();
  },
}
```

Ihr könnt jetzt sehen, wie wir verschiedene Elemente unseres ersten Features in die `setup` Methode verschoben haben.
Was noch fehlt: Wir rufen die `fetchImages` in der `mounted` Lebenszyklus-Methode auf und stellen einen Watcher bereit, der sich darum kümmern soll neue Bilder anzufragen, sobald sich die `tag` prop verändert.

Wir hoffen, dass Euch unsere kleine Einführung etwas helfen konnte. Im [nächsten Teil](https://vuejs.de/artikel/composition-api-teil-2/) geht es weiter mit dem Lifecycle Hook.
