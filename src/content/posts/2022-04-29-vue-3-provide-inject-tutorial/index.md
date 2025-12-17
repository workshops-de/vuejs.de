---
title: "Vue 3 provide/inject-Tutorial"
description: "Wie provide/inject in Vue 3 genutzt werden kann, um prop drilling zu vermeiden und Daten sicher über mehrere Komponenten zu teilen, erfahrt ihr in diesem Artikel."
author: "Antony Konstantinidis"
published_at: 2022-04-22T09:00:00.000Z
categories: "tutorial vuejs typescript"
tutorial_page_order: "1"
header_image: "header.jpg"
---

Normalerweise nutzen wir in Vue `props` um Daten zwischen Komponenten weiterzugeben.

In komplexeren Anwendungen kann es allerdings vonnöten sein, dass wir Daten über mehrere Ebenen an eine tieferliegende Komponente weiterreichen müssen. In solchen Fällen reichen Kompontenen bestimmte props nach unten durch ohne diese selbst zu benötigen. Dieses Muster ist als **prop drilling** bekannt.

Für Entwickler von Plugins oder Komponentenbibliotheken ergeben sich ebenfalls Probleme hinsichtlich der Bereitstellung von Daten.

Diese sind sogar noch schwerwiegender, da man keinen Zugriff auf die konsumierende Anwendung hat.

Diese Probleme können durch die beiden Methoden `provide` und `inject` umgangen werden. Durch sogenannte dependency provider können Daten jeder Kindkomponente bereit gestellt werden. Ganz ohne prop drilling.

```typescript
// Parent.vue
import { provide } from "vue";

export default {
  setup() {
    provide(/* key */ "count", /* value */ 0);
  },
};
```

```html
<Parent>
  <Child>
    <Grandchild><Grandchild>
  </Child>
</Parent>
```

```typescript
// Grandchild.vue
import { inject } from "vue";

export default {
  setup() {
    const count = inject(/* key */ "count");
    console.log(count); // 0
  },
};
```

Nützlich wird dies allerdings insbesondere dann, wenn man mit reaktiven Daten und Methoden arbeitet. Nehmen wir z. B. eine Tabellenkomponente, dessen Spalten durch Komponenten und nicht durch eine `prop` definiert werden können:

```html
<MyTable>
  <MyColumn key="id" label="Identifier" />
  <MyColumn key="name" label="First name" :sortable="true" />
  <MyColumn key="email" label="Email address" :sortable="true" />
</MyTable>
```

Eine solche Funktionalität könnten wir durch die Nutzung von `provide/inject` herstellen:

```tsx
// MyTable.vue
import { provide, ref } from "vue";

export default {
  setup() {
    const columns = ref<Column[]>([]);

    provide("TableKey", {
      columns,
    });
  },
};
```

```tsx
// MyColumn.vue
import { inject } from 'vue'

export default {
  props: ['key', 'label', 'sortable']
  setup(props) {
    const table = inject('TableKey')
    table?.columns.push(props)
  }
}
```

Schauen wir uns dieses Beispiel genauer an, so fallen gleich mehrere Fallstricke auf, welche von vornherein unterbunden werden sollten. Dafür bietet Vue einige Empfehlungen und Optimierungsmöglichkeiten an.

## `Symbol` und auslagern von Schlüsseln

Der verwendete Schlüssel ist als Inline-String angegeben und skaliert daher nicht gut. Wir können nicht sicherstellen, dass niemand sonst diesen Schlüssel verwendet oder wir uns nicht vertippen. Daher bietet es sich an, die Schlüssel auszulagern und durch eine `Symbol`-Deklaration (siehe [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)) kollisionssicherer zu gestalten.

```tsx
// keys.ts
export const MY_TABLE_KEY = Symbol('MY_TABLE_KEY')

// in provider component
import { MY_TABLE_KEY } from '@/keys'
provide(MY_TABLE_KEY, {...})

// in injector component
import { MY_TABLE_KEY } from '@/keys'
const injected = inject(MY_TABLE_KEY)
```

## Typisierung der Daten

Die Verwendung von Konstanten hilft jedoch nicht bei der ordentlichen Typisierung. `provide` und `inject` werden für gewöhnlich in unterschiedlichen Komponenten definiert, wir können also an beiden Stellen nie wirklich sicher sein, dass wir uns nicht vertippen und die Daten richtig verwenden. Haben wir die Variable in `MyTable` wirklich `columns` genannt oder war es doch `cols`?

Daher sollte der Typ `InjectionKey` verwendet werden. Damit lässt sich eine Synchronisierung des Typs zwischen dem Provider und Consumer sicherstellen.

```tsx
// keys.ts
import { InjectionKey } from "vue";
import { TableConfig } from "@/types";
export const MY_TABLE_KEY: InjectionKey<TableConfig> = Symbol("MY_TABLE_KEY");

// in provider component
// ❌ Type Error
provide(MY_TABLE_KEY, {});

// in injector component
const injected = inject(MY_TABLE_KEY); // typed as TableConfig | undefined
injected.columns; // safe access through autocompletion
```

## Defaultwerte und garantierte Bereitstellung von Daten

Da nicht garantiert werden kann, dass `provide` weiter oben im Baum wirklich aufgerufen wurde, ist der Rückgabewert von `inject` immer nullable. `inject` erlaubt zwar einen zweiten Parameter, welcher es ermöglicht einen Defaultwert anzugeben, allerdings hilft uns das nicht die gewünschte Funktionalität abzubilden und ist nur für statische Daten sinnvoll.

Daher empfiehlt es sich eine Hilfsfunktion für `inject` zu schreiben, welche prüft, ob die Daten wirklich bereitgestellt wurden und sonst eine Exception wirft.

```tsx
// utils.ts
function requireInjection<T>(key: InjectionKey<T>, defaultValue?: T) {
  const resolved = inject(key, defaultValue);
  if (!resolved) {
    throw new Error(`${key} was not provided.`);
  }
  return resolved;
}
```

Nutzen wir nun diese Hilfsfunktion in `MyColumn`, so können wir vollkommen sicher auf die Daten zugreifen.

```tsx
// MyColumn.vue (revised)
import { inject } from 'vue'
import { MY_TABLE_KEY } from '@/keys'
import { requireInjection } from '@/utils'

export default {
  props: ['key', 'label', 'sortable']
  setup(props) {
    const table = requireInjection(MY_TABLE_KEY)
    // autocompletion and without optional chaining, since it is safe to use
    table.register(props)
  }
}
```

## Immutability

Zuletzt widmen wir uns noch der reaktiven Eigenschaft `columns`. Die bereitgestellten Daten sollten immer vor direkter Manipulation geschützt werden, um eine Nachvollziehbarkeit und einen einheitlichen Datenfluss zu gewährleisten. Dafür nutzen wir die `readonly` Funktion. Stattdessen sollten Funktionen (siehe `register`) mit angeboten werden, durch welche eine kontrollierte Manipulation im Provider gewährleistet werden kann.

```tsx
// MyTable.vue (revised)
import { provide, ref, readonly } from "vue";
import { MY_TABLE_KEY } from "@/keys";

export default {
  setup() {
    const columns = ref([]);

    function register(column: Column) {
      columns.value.push(column);
    }

    provide("TableKey", {
      columns: readonly(columns),
      register,
    });
  },
};
```
