---
title: "Vue 3 &lt;script setup&gt;-Tutorial"
description: "Seit dem Release von Vue 3 und der Composition API ist die &lt;script setup&gt;-Syntax die empfohlene Schreibweise. Welche Vorteile sie bietet, klären wir in diesem Artikel."
author: "Antony Konstantinidis"
published_at: 2022-04-22 09:00:00.000000Z
categories: "tutorial vuejs typescript"
tutorial_page_order: '1'
---

Mit der Veröffentlichung der Composition API hat auch die neue Komponentenoption `setup` Einzug in Vue erhalten. Damit benötigen wir in den meisten Fällen keine anderen Optionen mehr und schreiben unsere gesamten Code innerhalb dieser Funktion. Die Idee von `<script setup>` ist, dass man den unnötigen Wrapper und die anderen alten Komponentenoptionen loswerden möchte, um vereinfacht und zielgerichtet Komponenten schreiben kann.

```vue
// OldExampleComponent.vue
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const count = ref<number>(0)

    function increment() {
      count.value++
    }

    return {
      count,
      increment
    }
  }
})
</script>
```

```vue
// NewExampleComponent.vue
<script setup lang="ts">
import { ref } from 'vue'

const count = ref<number>(0)

function increment() {
  count.value++
}
</script>
```

Mit der `<script setup>`-Syntax können wir kompakt und direkt unsere Komponentenlogik schreiben. Selbst ein `return`-Statement wird nicht mehr benötigt. Jede Variable und Methode, die wir definieren, wird automatisch im Template zur Verfügung gestellt.

Auch importierte Daten, wie Funktionen und sogar Komponenten, können wir direkt verwenden. Komponenten müssen nicht mal mehr gesondert registriert werden:

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { format } from '@/utils/currency'
import MyComponent from '@/components/MyComponent.vue'

const count = ref<number>(0)

function increment() {
  count.value++
}
</script>

<template>
  <button @click="increment">{{ format(count) }}</button>
  <MyComponent />
</template>
```

## Props und Events

Um Optionen wie `props` und `emits` zu deklarieren, müssen wir sogenannte Compiler-Makros verwenden, welche automatisch innerhalb von `<script setup>` verfügbar sind.

```vue
<script setup lang="ts">
const props = defineProps({
  msg: String
})

const emit = defineEmits(['update', 'remove'])
</script>
```

Die beiden Funktionen müssen nicht importiert werden und werden bei der Verarbeitung von `<script setup>` weg kompiliert.

`defineProps` nimmt denselben Wert an, wie die Option `props`, während `defineEmits` denselben Wert annimmt wie die Option `emits`.

Wenn wir ohnehin schon TypeScript in unserer Anwendung verwenden, dann können wir `props` und `emits` auch mit einer reinen Typsyntax deklarieren:

```typescript
const props = defineProps<{
  msg: string
  count?: number
}>()

const emit = defineEmits<{
  (e: 'update', id: number): void
  (e: 'remove'): void
}>()
```

Beide Ansätze können nicht miteinander kombiniert werden, d. h. entweder wir verwenden den Generic oder die Klammern der Funktionen, aber niemals beides gleichzeitig. Entscheiden wir uns für den TypeScript-Weg, so ist wichtig zu erwähnen, dass wir aktuell keine importierten Typen oder Interfaces verwenden können, sondern nur Typ-Literale (siehe Beispiel) oder in der selben Datei definierte Typen oder Interfaces.

Bei den Events können wir selbst die Parameter genauer spezifizieren und damit typensicheren Code schreiben.

### Standardwerte für `props`

Oben im Beispiel haben wir die prop `count` als optional gekennzeichnet, allerdings fehlt uns hier eine Möglichkeit einen Standardwert anzugeben. Aus diesem Grund existiert ein weiterer Compiler-Makro namens `withDefaults`.

```typescript
interface Props {
  msg: string
  count?: number
}

const props = withDefaults(defineProps<Props>(), {
  count: 0
})
```

Wird `withDefaults` nicht verwendet, aber eine Prop im Typen als optional gekennzeichnet, behandelt Vue diese `prop` als obligatorisch.

## Slots und Attribute verwenden

In der Regel werden Slots und Attribute in Komponenten direkt im Template über `$slots` und `$attrs` verwendet und selten bis gar nicht im `script` benötigt. Falls es dennoch mal vonnöten sen sollte, stellt Vue mit `useSlots` und `useAttrs` entsprechende Funktionen bereit.

```vue
<script setup lang="ts">
import { useSlots, useAttrs } from 'vue'

const slots = useSlots()
const attrs = useAttrs()
</script>
```

## Weitere Optionen verwenden

In einigen Fällen ist es nötig, dass wir benutzerdefinierte Optionen in unseren Komponenten deklarieren. Vuelidate’s `validations` Option ist da nur ein beliebtes Beispiel. Diese weiteren Optionen, zu denen auch das Setzen eines Komponentennamens über `name` gehört, ist mit `<script setup>` nicht möglich.

Die Lösung zu diesen Problemen ist die Verwendung eines zusätzlichen `script`-Tags. Die beiden Blöcke werden bei der Verarbeitung der `*.vue`-Datei dann automatisch zusammengefügt.

```vue
<script>
// executed only once
export const componentName = 'MyComponent';

export default {
  name: componentName
  inheritAttrs: false,
  customOptions: {}
}
</script>

<script setup>
// executed for each component instance
</script>
```

## Zugriff von außen?

Verwenden wir `<script setup>` steht uns zwar alles im Template zur Verfügung, die Komponente selbst ist allerdings nach außen geschlossen. Wir können also über die Instanz einer Komponente, beispielsweise bei der Verwendung von `$parent` oder Template refs, nicht auf die Eigenschaften und Funktionen, die innerhalb von `<script setup>` deklariert wurden, zugreifen.

Um etwas explizit freizugeben, müssen wir ein weiteres Compiler-Makro verwenden: `defineExpose`.

```vue
<script setup lang="ts">
import { ref } from 'vue'

const count = ref<number>(0)

function increment() {
  count.value++
}

defineExpose({
  count,
  increment
})
</script>
```

## Top-level `await`

In Komponenten müssen wir häufig Daten asynchron von einem Service anfragen. In `<script setup>` steht uns dafür auf oberster Ebene das `await` Keyword zur Verfügung.

Eine auf diese Art definierte Komponente muss mit der `Suspense`-Komponente verwendet werden, damit Vue sich um die Auflösung der Asynchronität kümmern und die Komponente richtig laden kann.

```vue
// AsyncComponent.vue
<script setup>
const user = await fetch(`/users/1`).then((d) => d.json())
</script>
```

```html
// ParentComponent.vue
<template>
  <Suspense>
    <AsyncComponent />
  </Suspense>
</template>
```

Achtung: Bei Suspense handelt es sich derzeit allerdings noch um ein experimentelles Feature, welches nicht für produktive Anwendungen empfohlen wird.

## Verfügbarkeit außerhalb von Vue 3

Solltest du nicht das große Glück haben bereits mit Vue 3 arbeiten zu dürfen, wird es dich sicher freuen zu erfahren, dass es ein fantastisches Plugin gibt, mit welchem `<script setup>` sowohl in Vue 2, als auch Nuxt, Vite oder der Vue CLI zur Verfügung steht: [Unplugin vue2-script-setup](https://github.com/antfu/unplugin-vue2-script-setup){:target="_blank"}
