---
title: "Die Composition API in Vue.js 3 – Teil 2"
description: "Im ersten Teil haben wir Euch schon etwas über die Composition API und deren neuen Funktionen in Vue.js 3 erzählt. Heute geht es weiter mit Teil 2 und dem Lifecycle Hook."
author: "Antony Konstantinidis"
published_at: 2020-12-18T11:00:00.000Z
categories: "vuejs advanced composition-api"
tutorial_page_order: "1"
header_image: "header.jpg"
---

[Im ersten Teil](https://vuejs.de/artikel/composition-api-teil-1/) haben wir Euch schon etwas über die Composition API und deren neuen Funktionen in Vue.js 3 erzählt. Anhand eines Codebeispiels wollen wir Euch die Funktionsweise und den Aufbau einer Komponente mit der Composition API näherbringen.
Wir haben unser erstes Feature fast vollständig in die `setup` Methode verschoben, welche als Einstiegspunkt für die Composition API benötigt wird. Zur Komplettierung dieses Vorhabens geht es nun weiter damit die Lebenszyklus-Methode und den benötigten Watcher zu überarbeiten.

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

## Lebenszyklus-Methoden und ihre Verwendung

Eine Komponente benötigt häufig weitere Funktionen wie z. B. die Kommunikation mit einer API.
Diese Funktionen werden meistens während eines bestimmten Zustandes der Komponente durchgeführt, nach dem mounten, vor der Zerstörung oder anderen.
Für diesen Zweck bietet uns Vue die Möglichkeit bestimmte Lebenszyklus-Methoden zu verwenden, mit denen wir Code ausführen können, wenn eine Komponente einen bestimmten Zustand in der Ausführung erreicht.

Schauen wir uns mal an, welche typischen Lebenszyklus-Methoden es unter anderem gibt:

_beforeCreate_ – wird sofort nach der Initialisierung der Instanz aufgerufen, noch bevor Optionen verarbeitet werden.
_created_ – wird aufgerufen, nachdem die Instanz erstellt wurde.
_beforeMount_ – wird genutzt, bevor das Mounten und Rendern des HTML-Konstrukts.
_mounted_ – wird aufgerufen, wenn die Instanz gemountet wird.
_beforeUpdate_ wird aufgerufen, wenn sich reaktive Daten geändert haben – bevor das DOM neu gerendert wird.
_updated_ – wird aufgerufen, wenn sich reaktive Daten geändert haben und das DOM neu gerendert wurde.
_beforeUnmount_ – wird aufgerufen, kurz bevor die Vue-Instanz zerstört wird.
_unmounted_ – wird aufgerufen, nachdem die Vue-Instanz zerstört wurde.

Wenn Ihr Euch noch mehr mit dem Thema Lebenszyklus-Methoden auseinandersetzen möchtet, empfehlen wir Euch die [API-Dokumentation zu LifeCycle-Hooks](https://v2.vuejs.org/v2/api/#Options-Lifecycle-Hooks).

Die Nutzung dieser Methoden mit der Options API sollte bereits bekannt sein und kann dem obigen Codebeispiel auch exemplarisch entnommen werden. Wir wollen uns nun anschauen, wie die Registrierung von Lebenszyklus-Methoden unter Verwendung der Composition API funktioniert.

### Die Lebenszyklus-Methoden-Registrierung unter `setup`

Dank neuer Vue Funktionen ist dies recht einfach möglich.
Das Besondere: Lebenszyklus-Methoden in der Composition API haben die gleiche Bezeichnung wie in der Options API.
Der einzige Unterschied: Sie verwenden einen `on`-Präfix, zum Beispiel:

```javascript
import { onMounted } from "vue";
```

Diese Funktionen können nur innerhalb der `setup` Option verwendet werden.
Automatisch wird die aktuelle Komponenten-Instanz ermittelt, die den `setup` Hook aufruft. Damit soll das Problem beim Extrahieren von logischen Bestandteilen in externe Funktionen verringert werden. Auf diesen Teil werden wir später noch einmal genauer eingehen.

### Die Nutzung der `onMounted` Funktion

Alle Lebenszyklus-Methoden akzeptieren einen Callback, der ausgeführt wird, wenn der Hook von der Komponente aufgerufen wird. Die Verwendung der `mounted` Lebenszyklus-Methode in unserem Beispiel sieht wie folgt aus:

```javascript
import { ref, onMounted } from 'vue';
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

    onMounted(fetchImages);

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
}
```

Auf Änderungen der `tag` prop reagieren wir derzeit mit einem Watcher, welcher ebenfalls noch mit der Options API umgesetzt ist. Als nächstes schauen wir uns an, wie wir diesen auch Composition API kompatibel umsetzen können.

## Anpassungen mit `watch`

Genauso wie wir einen Watcher für die user prop innerhalb unserer Komponente mit der `watch` Option einrichten, können wir dasselbe mit der aus Vue importierten `watch` Funktion tun.

### Die Signatur der `watch` Funktion

Die `watch` Funktion erlaubt unter anderem folgende Parameter: eine reaktive Referenz, die wir beobachten möchten sowie einen Callback mit dem neuen und alten Wert der beobachteten Variable.

```javascript
import { ref, watch } from "vue";

const count = ref(0);

watch(count, (newValue, oldValue) => {
  console.log(`The new value is ${newValue}.`);
});

count.value = 5; // trigger watcher
```

Sobald sich die `count` Variable ändert, wird der Watcher ausgelöst und der Callback ausgeführt. In unserem Fall wird 'The new value is: 5' in unsere Konsole übertragen.

Mit der `watch` Funktion lässt sich noch mehr erreichen. Mehr Informationen hierzu findet Ihr auch in der [Dokumentation[(https://vuejs.org/api/reactivity-core.html#watch).

### Die Verwendung des Watchers in unserem Codebeispiel

```javascript
import { ref, onMounted, watch, toRefs } from 'vue';
import fetchImagesFromAPI from '@/api/fetch-images';

export default {
  props: {
    tag: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { tag } = toRefs(props);

    let images = ref([]);

    async function fetchImages() {
      images.value = await fetchImagesFromAPI(tag.value);
    }

    onMounted(fetchImages);

    watch(tag, fetchImages);

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
}
```

Als Erstes möchten wir hier auf die Verwendung von `toRefs` am Anfang des `setup` verweisen. Damit stellen wir sicher, dass der Watcher auf Änderungen an der `tag` prop reagiert.

Kurz zusammengefasst: `toRefs` konvertiert ein reaktives Objekt in ein neues Objekt, wobei jede Eigenschaft des resultierenden Objekts ein `ref` ist, der auf die entsprechende Eigenschaft des ursprünglichen Objekts zeigt. Wir erhalten damit ganz viele `ref` anstatt ein `reactive`.
Mehr Informationen dazu findet Ihr wie gewohnt in der Vue Dokumentation zu [diesem Thema](https://vuejs.org/api/reactivity-core.html).

Dank dieser letzten Änderungen konnten wir den ersten logischen Teil unserer Komponente aus mehreren Optionen an einen Ort in unserer `setup` Methode verschieben.

> 1. Die Anfrage an eine externe API, um passende Bilder zu einem Tag zu erhalten. Das Tag wird über eine `prop an die Komponente übergeben. Beim Ändern des Tags sollte der Request erneut ausgeführt werden.

Im Folgenden nehmen wir den zweiten logischen Teil vor und setzen diesen ebenfalls mit Hilfe der Composition API um.

> {:start="2"} 2. Die Bilder sollen über einen Suchstring `searchQuery` durchsucht werden können.

## Unabhängige `computed` Eigenschaften

Ähnlich wie bei `ref` und `watch`, können `computed` Properties ebenfalls außerhalb einer Vue Komponente erstellt werden.
Hierzu wird nur die importierte `computed` Funktion aus Vue benötigt. Schauen wir uns hierzu noch einmal unser kleines Beispiel an:

```javascript
import { ref, computed } from "vue";

const count = ref(0);
const doubledCount = computed(() => count.value * 2);

count.value += 1;
console.log(count.value); // 1
console.log(doubledCount.value); // 2
```

Hier gibt die `computed` Funktion eine read-only reaktive Referenz auf die Ausgabe des Callbacks zurück, der als erste Funktion an `computed` übergeben wurde.
Um auf den Wert der neu erstellten `computed` Variablen zuzugreifen, müssen wir daher ebenfalls die `.value` Eigenschaft verwenden.

Wir verschieben jetzt die Suchfunktion in das setup:

```javascript
import { ref, onMounted, watch, toRefs, computed } from 'vue';
import fetchImagesFromAPI from '@/api/fetch-images';

export default {
  props: {
    tag: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { tag } = toRefs(props);

    let images = ref([]);

    async function fetchImages() {
      images.value = await fetchImagesFromAPI(tag.value);
    }

    onMounted(fetchImages);

    watch(tag, fetchImages);

    // second feature
    const searchQuery = ref('');

    const searchedImages = computed(() => images.value.filter(
      image => image.name.includes(searchQuery.value)
    ));

    return {
      images,
      fetchImages,
      searchQuery,
      searchedImages,
    };
  },
  data() {
    return {
      filters: { ... },
    };
  },
  methods: {
    updateFilters() { ... },
  },
  computed: {
    filteredImages() { ... },
  },
}
```

Wir haben `searchQuery` aus `data` und `searchedImages` aus `computed` entfernt und entsprechende Pendants in die `setup` Methode aufgenommen.
Natürlich könnten wir dasselbe nun auch für das letzte Feature übernehmen, aber durch die Verschiebung des Codes in die `setup` Option wird diese recht groß.
Aus diesem Grund werden wir den Code in eine eigenständige `composition functions` auslagern.

## Composition functions aka composables

In Vue 2 gab es leider keinen einfachen und fehlertoleranten Weg gab logische Bestandteile zwischen Komponenten wiederzuverwenden, löste man das Problem auf drei Arten:
Die Verwendung von Mixins, Mixin Factories und scoped Slots. Jede dieser Lösungen führt allerdings wieder zu neuen Unzulänglichkeiten. Wenn Ihr mehr darüber erfahren möchtet, empfehlen wir Euch folgenden [Link](https://www.vuemastery.com/courses/vue-3-essentials/why-the-composition-api/).
Mit Vue 3 und der Composition API lassen sich nun endlich diese ganzen Behelfslösungen durch eine einheitliche und gut verständliche Möglichkeit beheben: Composition Functions, auch bekannt als Composables.

Wie so eine Composition Function/Composable aussehen kann, zeigen wir Euch anhand des letzten Features unserer Ursprungskomponente:

> {:start="3"} 3. Das Filtern von Bildern mittels eines `filters` Objekts.

Hierfür erstellen wir zunächst eine neue Datei `useImageFilters`:

```javascript
import { reactive, computed } from "vue";

export default function useImageFilters(images) {
  const filters = reactive({
    resolution: "",
    category: "",
    location: "",
  });

  function updateFilters(type, value) {
    filters[type] = value;
  }

  const filteredImages = computed(() =>
    images.value.filter((image) =>
      filters.every((filterType, value) => image[filterType].includes(value))
    )
  );

  return {
    filters,
    updateFilters,
    filteredImages,
  };
}
```

Innerhalb unserer Datei verwenden wir dieselben Bestandteile des Features wieder, die wir zuvor in der Options API unter `data`, `computed` und `methods` eingeordnet hatten.
Wie wir in den kleinen Beispielen mit dem Counter bereits gesehen haben, können wir sämtliche Vue Funktionen auch außerhalb einer Vue Instanz importieren und verwenden.

Schauen wir uns nun die Verwendung der `useImageFilters` Funktion in unserer Komponente an. Denn schließlich bringt uns dieses Feature so isoliert zunächst einmal noch nicht viel.

```javascript
import { ref, onMounted, watch, toRefs, computed } from "vue";
import fetchImagesFromAPI from "@/api/fetch-images";
import useImageFilters from "@/composables/useImageFilters";

export default {
  props: {
    tag: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { tag } = toRefs(props);

    let images = ref([]);

    async function fetchImages() {
      images.value = await fetchImagesFromAPI(tag.value);
    }

    onMounted(fetchImages);

    watch(tag, fetchImages);

    // second feature
    const searchQuery = ref("");

    const searchedImages = computed(() =>
      images.value.filter((image) => image.name.includes(searchQuery.value))
    );

    const { filters, updateFilters, filteredImages } =
      useImageFilters(searchedImages);

    return {
      images: filteredImages,
      fetchImages,
      searchQuery,
      filters,
      updateFilters,
    };
  },
};
```

Da es sich bei `useImageFilters` um eine ganz gewöhnliche JavaScript Funktion handelt, können wir diese auch genau so verwenden.
Wir übergeben als Parameter die Liste von Bildern, welche bereits anhand eines möglicherweise eingegebenen Suchbegriffs gefiltert worden ist.

Sofern Filter gesetzt worden sind, kümmert sich unsere Funktion dann zusätzlich noch darum die ihm übergebene Liste weiter zu filtern.
Ob diese Liste nun vorher bereits gefiltert worden ist oder wie diese überhaupt zustande gekommen ist, ist für das Feature der Filterung vollkommen irrelevant.

Das Ergebnis der Filterung ist wiederum ein Array von passenden Bildern: `filteredImages`.
Damit Filter überhaupt gesetzt werden können, verwenden wir die Funktion `updateFilters`. Diese wird innerhalb unseres Composables definiert, an die Komponente zurückgegeben und von dieser weiter ans Template übergeben. Damit können wir innerhalb unseres Templates beispielsweise eine Liste von Filtern ausgeben und über die Methode mit der dazugehörigen Logik verknüpfen.

Zur Anzeige der gesetzten Filter übergeben wir ebenfalls unser `filters` Objekt and die Komponente und das Template.

Da wir nun weder das ursprüngliche `images`-, noch das `searchedImage`-Array im Template benötigen, geben wir diese auch nicht mehr mit zurück.
Den Nutzer interessiert schließlich nur die final gefilterte und durchsuchte Liste von Bildern, weshalb wir `filteredImages` als einziges an das Template übergeben.

## Auslagerung aller logischer Bestandteile in eigene Funktionen

Für die beiden ersten Features haben wir eine Transformation in die Composition API bereits vorgenommen. Um die `setup` Methode weiter zu entschlacken und die Vorteile der Komposition optimal nutzen zu können, erstellen wir zwei weitere neue Dateien und lagern den Code ebenfalls aus.

### `useFetchImages` als eigene composition function

Hierfür erstellen wir zunächst die `useFetchImages` Datei mit folgendem Inhalt:

```javascript
import { ref, computed, onMounted, watch } from "vue";
import fetchImagesFromAPI from "@/api/fetch-images";

export default function useFetchImages(tag) {
  let images = ref([]);

  async function fetchImages() {
    images.value = await fetchImagesFromAPI(tag.value);
  }

  onMounted(fetchImages);

  watch(tag, fetchImages);

  return {
    images,
    fetchImages,
  };
}
```

Wir haben lediglich sämtlichen für dieses Feature zuständigen Code aus der `setup` Methode herausgelöst und in eine eigens dafür zuständige Funktion kopiert.

Jetzt können wir diese ebenfalls in unserer Komponente verwenden:

```javascript
import { ref, toRefs, computed } from "vue";
import useFetchImages from "@/composables/useFetchImages";
import useImageFilters from "@/composables/useImageFilters";

export default {
  props: {
    tag: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { tag } = toRefs(props);

    const { images, fetchImages } = useFetchImages(tag);

    // second feature
    const searchQuery = ref("");

    const searchedImages = computed(() =>
      images.value.filter((image) => image.name.includes(searchQuery.value))
    );

    const { filters, updateFilters, filteredImages } =
      useImageFilters(searchedImages);

    return {
      images: filteredImages,
      fetchImages,
      searchQuery,
      filters,
      updateFilters,
    };
  },
};
```

Die einzelnen Codezeilen haben wir nun durch den Funktionsaufruf an unsere `useFetchImages` Methode substituiert. Wir übergeben lediglich unser `tag` prop und die Logik zur Beschaffung der Bilder liegt nun in der Verantwortung der composition function.
Die `onMounted` Funktion wird nun zwar nicht mehr direkt in unserer `setup` definiert, durch den Aufruf von `useFetchImages` aus `setup` heraus bleibt der Kontext allerdings erhalten und die zugehörige Komponente kann ermittelt werden.

### Die Bildersuche als eigene Funktion `useImageSearch`

Auch hier gehen wir wie in den vorherigen beiden Beispiel vor und legen eine eigene Datei für dieses Feature an:

```javascript
import { ref, computed } from "vue";

export default function useFetchImages(tag) {
  const searchQuery = ref("");

  const searchedImages = computed(() =>
    images.value.filter((image) => image.name.includes(searchQuery.value))
  );

  return {
    searchQuery,
    searchedImages,
  };
}
```

Als letztes nehmen wir nun noch die Nutzung dieser Funktion in unsere Komponente vor:

```javascript
import { toRefs } from "vue";
import useFetchImages from "@/composables/useFetchImages";
import useImageSearch from "@/composables/useImageSearch";
import useImageFilters from "@/composables/useImageFilters";

export default {
  props: {
    tag: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { tag } = toRefs(props);

    const { images, fetchImages } = useFetchImages(tag);

    const { searchQuery, searchedImages } = useImageSearch(images);

    const { filters, updateFilters, filteredImages } =
      useImageFilters(searchedImages);

    return {
      images: filteredImages,
      fetchImages,
      searchQuery,
      filters,
      updateFilters,
    };
  },
};
```

## Wiederverwendbarer Code

Wie wir anhand dieses Codebeispiels gesehen haben, können wir dank der Composition API sich wiederholende Code-Fragmente aus einer Komponente herauslösen und diese als wiederverwendbare Funktionen in anderen Komponenten zur Verfügung zu stellen.

Es entstehen weder Namenskonflikte noch unklare Beziehungen zwischen Features. Darüber hinaus können wir die kleineren Funktionen wesentlich besser testen und isoliert voneinander betrachten, sodass nachträgliche Änderungen wesentlich einfacherer und sicherer zu bewerkstelligen sind.

Bestimmt habt Ihr noch viele Fragen. Aber vielleicht konnte unsere kleine Einführung Euch die Composition API etwas näherbringen.
Natürlich gibt es noch viel mehr Möglichkeiten, aber darauf kommen wir ein anderes Mal zu sprechen.
