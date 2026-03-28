---
title: "Vue State Management: Composables, Provide/Inject und Pinia – Die richtige Wahl für jede Situation"
description: "Vue State Management: Composables, Provide/Inject und Pinia – Die richtige Wahl für jede Situation"
author: "Robin Böhm"
published_at: 2026-03-28T12:00:00.000Z
categories: "vuejs javascript frontend"
header_source: "https://unsplash.com/photos/colorful-code-scrolls-across-a-dark-background-Aowg76xooEY"
header_image: "header.jpg"
---

**TL;DR:** Vue gibt uns drei leistungsstarke Werkzeuge für State Management: Composables für wiederverwendbare Logik, Provide/Inject für Subtree-weite Weitergabe und Pinia für globalen App-State. Die Kunst liegt darin, das richtige Werkzeug für den richtigen Anwendungsfall zu wählen.
State Management ist eines der Themen in Vue, das auf den ersten Blick simpel wirkt – bis die Applikation wächst. Plötzlich jongliert man mit Prop Drilling, duplizierter Logik und verwirrendem Reaktivitätsverhalten. Michael Hoffmann (bekannt als @mokkapps) hat in einem umfassenden Deep-Dive-Guide die drei wichtigsten Ansätze verglichen und mit TypeScript-Beispielen untermauert.
## Die wichtigsten Punkte
- 📅 **Verfügbarkeit**: Vue 3 mit Composition API (alle drei Ansätze)
- 🎯 **Zielgruppe**: Vue-Entwickler:innen auf allen Levels, von Beginner bis Senior
- 💡 **Kernthema**: Wann nutze ich Composables, wann Provide/Inject, wann Pinia?
- 🔧 **Tech-Stack**: Vue 3, TypeScript, Pinia, Composition API
## Was bedeutet das für Vue-Entwickler:innen?
Einer der häufigsten Fehler in Vue-Projekten: State-Management-Lösungen werden eingesetzt, ohne zu überlegen, welche Komplexität sie wirklich erfordern. Der Artikel von Michael Hoffmann bringt endlich Klarheit – mit drei klaren Fragen, die vor jeder Entscheidung gestellt werden sollten:
1. **Wie weit soll der State geteilt werden?** (Einzelne Komponente, Subtree, global)
2. **Ist die Logik wiederverwendbar oder komponentenspezifisch?**
3. **Werden erweiterte Features benötigt?** (SSR, Persistenz, starke Typisierung)
## Die drei Ansätze im Überblick
### Composables – die erste Wahl für wiederverwendbare Logik
Composables sind Funktionen, die Zustand und Logik mit der Composition API kapseln. Sie sind das "Utility Module" für stateful Behavior.
**Wann Composables nutzen:**
- Wenn Logik über unzusammenhängende Komponenten hinweg wiederverwendet werden soll (z.B. Fetch-Logik, Formularhandling, Timer)
- Für kleine, lokale State-Teile, die nicht global sind (Zähler, Sichtbarkeits-Toggles, Input-Validierung)
- Wenn Performance zählt – Composables sind leichtgewichtig und erzwingen keine globale Reaktivität
Ein minimales Beispiel aus dem Original-Artikel:
```ts
import { ref } from 'vue'
export function useCounter(initial = 0) {
  const count = ref(initial)
  const increment = () => ++count.value
  const decrement = () => --count.value
  const reset = () => {
    count.value = initial
  }
  return { count, increment, decrement, reset }
}
```
**Best Practices:**
- `use`-Präfix verwenden: `useAuth`, `useFetch`, `useCounter`
- Composables nach Feature oder Domain gruppieren (`/composables/auth`, `/composables/ui`)
- Nur das nach außen geben, was Aufrufer wirklich brauchen
**Wann keine Composables:**
- Wenn der State wirklich global und monolithisch sein muss → besser Pinia
- Wenn State nur innerhalb eines Subtrees, aber nicht global geteilt werden soll → Provide/Inject
### Provide/Inject – für den lokalen Subtree-State
Provide/Inject erlaubt es einer Elternkomponente, Werte (reaktive Daten, Funktionen) bereitzustellen, die Nachkommen-Komponenten ohne Prop Drilling nutzen können.
**Typische Anwendungsfälle:**
- Theming-Kontexte
- Formulare mit verschachtelten Children
- Modal Manager
- Lokalisierung
```vue
<!-- Parent.vue -->
<script setup lang="ts">
import { provide, reactive } from 'vue'
const theme = reactive({ color: 'light', accent: '#009688' })
const toggle = () => theme.color = theme.color === 'light' ? 'dark' : 'light'
provide('theme', theme)
provide('toggleTheme', toggle)
</script>
```
```vue
<!-- Child.vue -->
<script setup lang="ts">
import { inject } from 'vue'
const theme = inject('theme')
const toggleTheme = inject('toggleTheme')
</script>
```
**Caveats & Best Practices:**
- Symbol Keys verwenden, um Kollisionen zu vermeiden
- Nicht übermäßig einsetzen – Komponentenbeziehungen werden implizit und schwerer nachzuvollziehen
- Mit Composables kombinieren: `provide('modal', useModal())` liefert das Beste aus beiden Welten
### Pinia – der offizielle Standard für globalen State
Pinia ist die offiziell empfohlene State-Bibliothek für Vue 3 und sollte für globalen State eingesetzt werden, auf den mehrere unzusammenhängende Komponenten oder Seiten zugreifen müssen.
**Warum Pinia:**
- Intuitives, modulares API mit erstklassigem TypeScript-Support
- Unterstützt SSR-Hydration und Plugin-Ökosystem (Persistenz, Logger)
- Kleine, fokussierte Stores statt monolithischer Lösung
```ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(null)
  const isLoggedIn = computed(() => !!user.value)
  function setUser(payload) {
    user.value = payload.user
    token.value = payload.token
  }
  function logout() {
    user.value = null
    token.value = null
  }
  return { user, token, isLoggedIn, setUser, logout }
})
```
Nutzung in einer Komponente:
```vue
<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
const auth = useAuthStore()
const { isLoggedIn } = storeToRefs(auth)
</script>
```
## Vergleichstabelle: Das richtige Werkzeug wählen
| Kriterium | Composables | Provide/Inject | Pinia |
|---|---|---|---|
| **Scope** | Lokal / unabhängige Instanzen | Subtree-Scope | Global / App-weit |
| **Anwendungsfall** | Wiederverwendbare Logik | Kontextuelle Settings | Globaler App-State |
| **Komplexität** | Gering | Sehr gering | Mittel |
| **Reaktivität** | Isoliert (außer bewusst geteilt) | Reaktive Objekte für Nachkommen | Reaktiv by design, überall zugänglich |
**Faustregel aus der Praxis:**
- **Composables first** – für kleine Apps und Features. Falls mehrere Komponenten dieselbe State-Instanz benötigen: entweder nach oben heben oder nach Pinia migrieren.
- **Provide/Inject** – wenn ein Feature auf einen Subtree begrenzt bleiben soll und Prop Drilling vermieden werden soll.
- **Pinia** – wenn State App-weit zugänglich sein muss, persistiert werden soll oder man von DevTools und Plugin-Support profitieren möchte.
## Developer Experience – was sich durch diesen Guide verbessert
Die klare Entscheidungshilfe schützt vor einem der häufigsten Fehler: zu früh Pinia einzusetzen (Overhead für einfache Fälle) oder zu lange mit Composables auszukommen, wo eigentlich ein globaler Store nötig wäre.
Die TypeScript-Code-Beispiele im Original sind direkt in bestehende Projekte übernehmbar. Besonders wertvoll: das "Wenn nicht"-Muster, das zeigt, in welche Falle man ohne bewusste Wahl tappt.
## Praktische nächste Schritte
1. **State-Audit im aktuellen Projekt durchführen**: Welche States sind wirklich global? Welche gehören in Composables?
2. **Pinia-Docs studieren**: Besonders den Abschnitt über [Setup Stores](https://pinia.vuejs.org/core-concepts/#setup-stores) – das fühlt sich für Vue-3-Entwickler:innen am natürlichsten an
3. **Den Original-Artikel lesen**: Michael Hoffmanns tiefer Dive enthält weitere Pattern und Entscheidungshilfen