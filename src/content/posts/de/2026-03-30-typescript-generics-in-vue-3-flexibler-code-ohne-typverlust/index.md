---
title: "TypeScript Generics in Vue 3: Flexibler Code ohne Typverlust"
description: "TypeScript Generics in Vue 3: Flexibler Code ohne Typverlust"
author: "Robin Böhm"
published_at: 2026-03-30T12:00:00.000Z
categories: "vuejs javascript frontend"
header_image: "https://images.unsplash.com/photo-1611592121675-a09a80da4117?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MTM4MjZ8MHwxfHNlYXJjaHwxfHxUeXBlU2NyaXB0JTIwR2VuZXJpY3MlMjBpbiUyMFZ1ZSUyMFRMRFIlMjBUeXBlU2NyaXB0JTIwR2VuZXJpY3N8ZW58MXwwfHx8MTc3NDg2NzA1N3ww&ixlib=rb-4.1.0&q=80&w=1080"
header_source: "https://images.unsplash.com/photo-1611592121675-a09a80da4117?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MTM4MjZ8MHwxfHNlYXJjaHwxfHxUeXBlU2NyaXB0JTIwR2VuZXJpY3MlMjBpbiUyMFZ1ZSUyMFRMRFIlMjBUeXBlU2NyaXB0JTIwR2VuZXJpY3N8ZW58MXwwfHx8MTc3NDg2NzA1N3ww&ixlib=rb-4.1.0&q=80&w=1080"
---

**TL;DR:** TypeScript Generics sind der elegante Mittelweg zwischen `any`-Chaos und copy-paste-Duplikaten. Jakub Andrzejewski vom Nuxt Ecosystem Team zeigt in einem aktuellen Praxis-Guide, wie Generic-Typen, `ApiResponse<T>`-Wrapper und `keyof`-Constraints Vue-Projekte typsicher und skalierbar machen.
Wer mit TypeScript in Vue-Projekten arbeitet, kennt das Dilemma: entweder man schreibt denselben Typ fünfmal mit leicht veränderten Datentypen, oder man greift zur `any`-Keule und verliert dabei Autocomplete, Typ-Inferenz und die Sicherheit, dass der Code zur Laufzeit tut, was man erwartet. TypeScript Generics lösen genau dieses Problem — und sie fügen sich besonders elegant in die Composition API von Vue 3 ein.
## Die wichtigsten Punkte
- 📅 **Veröffentlicht**: 30. März 2026 auf DEV Community
- 🎯 **Zielgruppe**: Vue 3 Entwickler:innen mit TypeScript-Grundkenntnissen
- 💡 **Kernfeature**: Generische Typen als wiederverwendbare Typ-Platzhalter ohne Verlust von Type Safety
- 🔧 **Tech-Stack**: TypeScript, Vue 3 Composition API, Nuxt, VueUse
## Was bedeutet das für Vue-Entwickler:innen?
Die Composition API von Vue 3 war der entscheidende Schritt hin zu erstklassiger TypeScript-Integration. Generics bringen diesen Ansatz auf die nächste Stufe: Statt für jede API-Route einen eigenen Response-Typen zu definieren, schreibt man einmal `ApiResponse<T>` — und das gesamte Projekt profitiert davon.
Besonders in Nuxt-Projekten mit vielen `useFetch`-Calls zahlt sich das aus. Anstatt bei jedem Datenabruf den Typ manuell zu casten, lässt sich ein typsicherer Composable definieren, der den Response-Typ als Generic-Parameter entgegennimmt.
### Das Grundprinzip: Typ-Platzhalter statt `any`
Das Problem beginnt harmlos. Eine Funktion soll für verschiedene Typen funktionieren. Die schnelle Lösung:
```typescript
function identity(value: any): any {
  return value
}
```
Das funktioniert — aber man verliert Typ-Inferenz, Autocomplete und mögliche Compiler-Fehler, die echte Bugs verhindern könnten. Die Alternative ohne Generics führt zu Code-Duplikaten, die den DRY-Prinzipien widersprechen:
```typescript
function identityString(value: string): string { return value }
function identityNumber(value: number): number { return value }
```
Mit Generics wird daraus eine einzige, typsichere Funktion:
```typescript
function identity<T>(value: T): T {
  return value
}
```
`T` ist ein Typ-Platzhalter, der beim Aufruf automatisch durch den konkreten Typ ersetzt wird. TypeScript inferiert den Rückgabetyp direkt aus dem Argument.
## Praktische Anwendungen in Vue & Nuxt
### Pattern 1: Wiederverwendbarer ApiResponse-Typ
Das häufigste und wertvollste Einsatzgebiet in Vue-Projekten ist ein generischer Wrapper für API-Antworten:
```typescript
type ApiResponse<T> = {
  data: T
  error: string | null
}
```
In einem Nuxt-Projekt definiert man diesen Typ einmal in `types/api.ts` und nutzt ihn project-weit:
```typescript
type User = { id: number; name: string }
const response: ApiResponse<User> = {
  data: { id: 1, name: "Jakub" },
  error: null
}
```
Kombiniert mit `useFetch` in Nuxt ergibt sich ein typsicheres Datenabruf-Muster:
```typescript
const { data, error } = await useFetch<ApiResponse<User[]>>('/api/users')
// data.value?.data ist automatisch User[] — kein Type-Cast nötig
```
### Pattern 2: `keyof`-Constraints für typsichere Zugriffe
Gerade in Form-Composables oder dynamischen Tabellenkomponenten ist folgender Pattern Gold wert:
```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key]
}
```
```typescript
const user = { id: 1, name: "Jakub" }
getProperty(user, "name")  // ✅ TypeScript kennt den Rückgabetyp: string
getProperty(user, "age")   // ❌ Compiler-Fehler — "age" existiert nicht auf User
```
Für Vue-Entwickler:innen besonders relevant: Dieser Ansatz lässt sich direkt in Composables für reaktive Formularfelder übersetzen.
### Pattern 3: Generic Props in Vue-Komponenten
Vue 3.3+ (seit Mai 2023) erlaubt generische Komponenten direkt über das `generic` Attribut auf `<script setup>`. Das ermöglicht vollständig typisierte Listenkomponenten ohne Code-Duplikation:
```vue
<!-- Generische Listenkomponente -->
<script setup lang="ts" generic="T">
defineProps<{
  items: T[]
}>()
</script>
```
**Wichtig:** Das `generic="T"` Attribut auf dem `<script setup lang="ts">` Tag ist zwingend erforderlich — erst dadurch wird `T` als Typ-Parameter verfügbar. Die Komponente wird dann typsicher auf den Datentyp spezialisiert, sobald man sie mit konkreten Daten verwendet — die IDE kennt dann alle Properties der List-Items.
## Developer Experience verbessert sich durch…
Die Verbesserungen sind spürbar im Alltag:
**Autocomplete überall**: Statt `any`-Typen, die die IDE zum Schweigen bringen, erhält man bei jedem Zugriff auf Generic-Daten vollständige Typ-Vorschläge.
**Refactoring-Sicherheit**: Ändert sich die Struktur eines API-Response-Typs, zeigt TypeScript sofort alle Stellen im Code, die angepasst werden müssen — quer durch alle Composables und Komponenten, die `ApiResponse<T>` nutzen.
**Kein Cast-Overhead**: Mit gut definierten Generics entfällt das manuelle `as User[]` an jeder Stelle. Der Typ fließt automatisch durch den Code.
**Elegante Composables**: Ein typsicheres `useFetch<T>` oder `useLocalStorage<T>` aus VueUse ist das direkte Ergebnis dieser Technik.
## Praktische Nächste Schritte
1. **Startet mit `ApiResponse<T>`**: Legt in eurem nächsten Nuxt- oder Vue-Projekt eine `types/api.ts` an und definiert dort einen generischen Response-Wrapper. Das zahlt sich sofort aus.
2. **Refactored bestehende Composables**: Schaut euch eure Custom Composables an — überall wo `any` steht oder mehrere fast-identische Funktionen existieren, sind Generics die richtige Antwort.
3. **Jakubs weiterführenden Artikel lesen**: Er hat einen separaten Deep-Dive zu generischen Props in Vue-Komponenten veröffentlicht, der die `<script setup generic>` Syntax ausführlich behandelt.
4. **`keyof`-Pattern für Formulare anwenden**: Wer dynamische Formular-Composables baut, sollte `K extends keyof T` als Standard-Werkzeug in sein Repertoire aufnehmen.