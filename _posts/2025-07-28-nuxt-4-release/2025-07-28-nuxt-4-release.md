---
title: "Nuxt 4.0 ist da: stabil und DX-fokussiert"
description: "Am 15. Juli 2025 wurde Nuxt 4.0 offiziell veröffentlicht. Nach über einem Jahr im Kompatibilitätsmodus. Das Team betont: kein Hype‑Release, sondern ein durchdachtes Major-Upgrade, das gezielt den Entwickler-Alltag erleichtert."
author: "Antony Konstantinidis"
published_at: 2025-07-28 09:30:00
header_source:
header_image: header.jpg
categories: "nuxt release"
---

Am 15. Juli 2025 hat das Nuxt-Team die lang erwartete Version 4 ihres beliebten Meta-Frameworks offiziell veröffentlicht. Anders als man es vielleicht von einem Major-Release erwarten würde, setzt Nuxt 4 nicht auf Schlagzeilen-taugliche Feature-Brecher, sondern legt den Fokus klar auf Stabilität, Entwicklerfreundlichkeit und eine moderne Projektstruktur. Der Slogan dazu: „Not a hype release.“

## Die neue `app/`-Struktur: Klarheit im Code

Die auffälligste Änderung dürfte die neue Verzeichnisstruktur sein. Statt Komponenten, Seiten, Layouts und Co. direkt im Projekt-Root zu platzieren, wandert der gesamte Anwendungscode nun standardmäßig in ein `app/`-Verzeichnis. Neben `pages/`, `components/`, `layouts/` oder `composables/` finden sich dort auch `app.vue`, `error.vue`, `plugins/`, `utils/` und die `app.config.ts`.

```bash
my-nuxt-app/
├─ app/
│  ├─ assets/
│  ├─ components/
│  ├─ composables/
│  ├─ layouts/
│  ├─ middleware/
│  ├─ pages/
│  ├─ plugins/
│  ├─ utils/
│  ├─ app.vue
│  ├─ app.config.ts
│  └─ error.vue
├─ content/
├─ public/
├─ shared/
├─ server/
└─ nuxt.config.ts
```

Das Ziel: bessere Trennung von Projekt- und Systemdateien, klareres Projekt-Setup und schnellere Datei-Überwachung durch fs.watch, besonders unter Windows oder Linux. IDEs können mit dieser Struktur leichter zwischen App- und Infrastrukturcode unterscheiden. Wer lieber bei der bisherigen Struktur bleibt, kann das problemlos tun, Nuxt erkennt die alte Struktur automatisch.

## Verbesserte Developer Experience

Unter der Haube hat sich einiges getan, um die Arbeit mit Nuxt noch angenehmer zu machen. So wurde unter anderem die TypeScript-Integration überarbeitet. Statt eines einzigen großen Projekts erzeugt Nuxt nun getrennte Typenbereiche für App-Code, Server-Code, shared Utilities und den Builder. Das bringt nicht nur bessere Autovervollständigung und Fehlermeldungen, sondern reduziert auch die Build-Zeiten bei großen Codebasen.

Auch die CLI wurde deutlich beschleunigt: Cold Starts bei `npx nuxt dev` laufen nun spürbar schneller. Das liegt unter anderem an der Wiederverwendung des V8-Compile-Caches und an der Umstellung der internen Kommunikation zwischen CLI und Vite auf Socket-basierte Kanäle statt HTTP. Dazu kommt ein nativ eingesetzter fs.watch-Filewatcher, der Systemressourcen schont und gleichzeitig änderungsfreudige Entwickler unterstützt.

## Datenfetching: geteilt, automatisch, intelligent

Wer oft mit `useAsyncData` oder `useFetch` arbeitet, darf sich über kleine, aber feine Verbesserungen freuen. Ergebnisse werden nun automatisch zwischen Komponenten mit gleichem Key geteilt, unnötiges Refetching vermieden, und auch Cleanup-Logik beim Unmounting ist jetzt integriert. In Kombination mit reaktiven Keys sorgt das für eine noch konsistentere Datenbasis und performantem Verhalten.

## Upgrade auf Nuxt 4: Alles halb so wild

Die Migration von Nuxt 3 auf Nuxt 4 wurde vom Core-Team bewusst so schmerzfrei wie möglich gestaltet. Die meisten Breaking Changes wurden in den letzten Monaten bereits unter dem Nuxt-3-Kompatibilitätsmodus eingeführt und getestet. Wer heute ein Nuxt-3-Projekt hat, kann also meist problemlos upgraden. Ein Codemod steht bereit, um viele Aufgaben zu automatisieren. Zusätzlich lassen sich alte Features weiterhin per Config-Flag aktivieren.

Ein typischer Upgrade-Workflow sieht so aus:

1. `npx nuxt upgrade --dedupe`

2. Codemod ausführen (optional)

3. App testen, kleine Anpassungen machen

Der Support für Nuxt 3 läuft noch bis Januar 2026. Genug Zeit also für Teams, den Umstieg gut zu planen. Weitere Informationen finden sich auch in dem hervorragenden [Upgrade Guide](https://nuxt.com/docs/4.x/getting-started/upgrade){:target="_blank"}.

Ebenfalls empfehlenswert ist dazu das aktuelle Video von Alexander Lichter: [Nuxt 4 - An overview!](https://www.youtube.com/watch?v=rCT54d8sMWk&t=860s){:target="_blank"}.

## Ausblick: Was kommt mit Nuxt 5?

Nuxt 4 markiert nicht das Ende, sondern vielmehr den stabilen Ausgangspunkt für das nächste große Kapitel. In Arbeit ist bereits Nuxt 5 mit Neuerungen wie Nitro v3, h3 v2, typisierter Datenlogik und Multi-App-Support. Auch die Integration der Vite Environment API steht bevor. Wer heute auf Nuxt 4 setzt, ist also bestens gerüstet.

## Fazit

Nuxt 4 ist kein Feature-Feuerwerk, sondern ein solides Fundament für nachhaltige Entwicklung. Gerade für Teams, die auf gute Developer Experience, klare Strukturen und langfristige Wartbarkeit setzen, lohnt sich der Blick auf das Update. Wer bisher auf Nuxt 3 unterwegs war, wird den Wechsel in vielen Fällen kaum spüren, außer im positiven Sinne.

Es muss nicht immer Hype sein. Manchmal ist solide genau das, was ein Projekt braucht.