---
title: "Vite 2 – das noch bessere Development und Build Tool"
description: "Wer mit JavaScript arbeitet, weiß wie oft die Arbeit durch langsame Tools ausgebremst wird. Mit Vite soll nun alles extrem beschleunigt werden. Selbst gegenüber webpack scheint Vite 10-100 mal schneller zu sein. Wir haben uns das Tool im neuen Gewand etwas näher angeschaut."
author: "Antony Konstantinidis"
published_at: 2021-07-19T14:30:00.000Z
categories: "vuejs tooling development"
tutorial_page_order: "1"
header_image: "header.jpg"
---

Wer mit JavaScript arbeitet, weiß wie oft die Arbeit durch langsame Tools ausgebremst wird. Mit Vite – dem Development und Build Tool in Release 2 – soll nun alles extrem beschleunigt werden. Selbst gegenüber webpack scheint Vite 10-100 mal schneller zu sein. Wir haben uns das Tool im neuen Gewand etwas näher angeschaut

## Was ist Vite?

Vite [vit], das mittlerweile in Version 2.4.2 zur Verfügung steht, hat seinen Namen aus dem Französischen und heißt übersetzt einfach nur „schnell“ – was auch sehr passend gewählt wurde. Entwickler Evan You, der für das clientseitige Vue Framework verantwortlich ist – wollte mit diesem Tool ein neues Maß an Geschwindigkeit und Entwicklungskomfort bieten. Als Development-Server und Build Tool soll Vite die JavaScript-Entwickler von Anfang bis Ende unterstützen – vom Erstellen des Projekts bis hin zum Release. Hierfür werden die nativen ECMA-Script-Module des Browsers genutzt sowie Werkzeuge wie esbuild zum Kompilieren von TypeScript in JavaScript. Das Besondere: Allein durch esbuild soll das Pre-Bundling um das 10- bis 100-fache beschleunigt werden.
In der jetzigen Version enthält das Tool außerdem Templates für Vue, React, Preact und Lit Element.

## Development- und Build-Tools für JavaScript – eine besondere Herausforderung

Da es lange Zeit keine ES-Module für Browser gab, mussten Entwickler ihren Code modularisiert zusammenfassen, d. h. mit Tools bündeln und aufarbeiten, damit sie im Browser ausgeführt werden konnten. Mit der Zeit kamen Tools wie webpack, Rollup und Parcel dazu, die diesen Prozess stark verbesserten und vereinfachten. Da aber auch die Anwendungen immer komplexer und anspruchsvoller wurden, stieg die Menge an JavaScript exponentiell an.

Viele Entwickler setzten dabei zwar auf Bundler wie webpack oder snowpack. Hierbei werden alle JavaScript-, CSS- und Bilddateien zusammengefasst und zu weniger Einzelteilen verschmolzen. Doch je größer die Projekte werden, desto langsamer werden auch die Development-Server. Einen Dev-Server zu starten und die Dateien zu bearbeiten kostete viel Zeit – und das obwohl meist Hot Module Replacement (HMR) eingesetzt wird. Die Folge: Die Entwickler müssen immer länger warten, bis ihre Änderungen am Bildschirm sichtbar werden. Und das kann dauern, da manche Projekte Tausende Module enthalten können.

So entstand die Idee zu Vite – einem Build und Development Tool, das sehr viel schneller und leistungsfähiger werden sollte.

## Warum Vite?

Es gibt so viele Bundler für Entwickler. Warum brauchen wir wieder etwas Neues?

Vite arbeitet im Prinzip wie webpack, aber mit ein paar Verbesserungen. ES-Module lassen sich z. B. direkt einbinden und jeder Browser mit Dynamic-Import-Unterstützung kann sie ausführen. Heute sind das alle modernen Browser. Dabei wird der vorkonfigurierte Bundler verwendet, statt die Daten während der Entwicklung zu bündeln. Das spart viel Zeit und sorgt für enorme Performance. Das Bundling geschieht übrigens mit Rollup, das Evan You als zukunkftsweisender ansieht als z. B. webpack. So verwendet Rollup bereits das neue standardisierte Format für Code-Module, das in der ES6-Revision von JavaScript enthalten ist.

**Ein weiteres Plus:** Wenn der Browser Dateien einzeln anfragt, bremst das die Geschwindigkeit und Leistung aus. Damit das nicht passiert, ist Vite in der Lage, unabhängige Einstiegspunkte zu finden und dabei den Code zu splitten. So werden z. B. JavaScript-Module, die später gebraucht werden, auch erst später geladen. Die Module werden sozusagen on demand von Vite geparst und kompiliert.

Zusätzlich bietet Vite viele Funktionen wie JSX-Unterstützung, Integration von CSS-Präprozessoren oder den Einsatz von WebAssembly-Modulen.

Vielleicht fragt Ihr Euch jetzt, warum nicht Snowpack, das ebenfalls sehr schnell ist? Hiermit können sogar unterschiedliche Bundler wie webpack, Rollup oder Esbuild verwendet werden. Das stimmt zwar, aber leider ist Esbuild immer noch instabil und der Rollup-Optimierer ist in die Jahre gekommen und wird nicht mehr gepflegt.

Schaut euch doch auch mal eine Demo zu Vite von Evan You selbst an:

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/Pgsges6rw0o" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Warum jetzt Umsteigen auf Vite 2?

Im Dezember 2020 gab es eine [Erklärung von Evan You](https://github.com/vitejs/vite/issues/1207), welche Fehler er in Vite 1.0 sieht und wie er sich Vite 2.0 wünscht. Zum Beispiel ist die Plug-in-Architektur sowie einzelne Elemente nicht so modular wie sie angedacht waren, außerdem mussten die Schnittstellen optimiert werden. Dabei stellte er fest, dass es mit ein paar Änderungen nicht getan ist. Folglich stoppte man die Arbeit an Version 1.0 und konzentrierte sich stattdessen auf Version 2.0. Aus diesem Grund raten wir allen Entwicklern, gleich auf Vite 2.0 umzusteigen, auch wenn dadurch sich einiges im Entwicklungs- und Build-Prozess ändert.

## Was sind die Vorteile von Vite?

- Bessere Performance: Verbesserte Startzeit des Dev-Servers durch Unterteilung der Module in die Kategorien Abhängigkeiten und Quellcode. Auf diese Weise können Abhängigkeiten mit Esbuild 10-100x schneller gebündelt werden.
- Intelligente Arbeitsaufteilung: Bereitstellung des Quellcode über das native ESM. So ist der Browser in der Lage, einen Teil der Arbeit des Bundlers zu übernehmen.
- Sofortige Aktualisierungen: Hot Module Replacement (HMR) wird über natives ESM durchgeführt.
- TypeScript-Kompatibilität: Out-of-Box-Unterstützung für TypeScript
- Optimierter Build-Prozess
- Universelle Plugin-Schnittstelle
- On-Demand-Kompilierung
- Null-Konfiguration für mehrere Präprozessoren
- Eingebaute Unterstützung für serverseitiges Rendering
- Mehr Möglichkeiten dank Erweiterung der Standardkonfiguration
- uvm.

## Fazit und Ausblick

Vite 2.0 sorgt jetzt schon für viel Aufmerksamkeit. Regelmäßig erscheinen neue Plug-ins und Projekte, die vor allem durch die treue Community getrieben werden. Auch die Unterstützung für serverseitiges Rendern findet großen Anklang.
Da Anwendungen immer komplexer und anspruchsvoller werden und entsprechend auch mehr JavaScript eingesetzt wird, müssen Entwickler einen Weg finden, die Performance wieder zurückzugewinnen. Dank Vite steht Euch nun ein sehr schneller Entwicklungs-Server zur Verfügung, der genau das kann. Statt am Bildschirm lange auf Änderungen zu warten, bis diese verarbeitet wurden, sind diese nun innerhalb kürzester Zeit sichtbar.

Wir sind jedenfalls gespannt, wie sich Vite weiterentwickeln wird und nutzen es heute schon für viele unserer Vue Projekte. Wie sieht es bei Euch aus? Gebt Ihr Vite auch eine Chance?

## Weitere Informationen

- Vite Homepage: [https://vite.dev/](https://vite.dev/)
- Vite auf Github: [https://github.com/vitejs/vite](https://github.com/vitejs/vite)
- Offizielle Plugins: [https://vite.dev/plugins/#vitejs-plugin-vue](https://vite.dev/plugins/#vitejs-plugin-vue)
- Awesome Vite: [https://github.com/vitejs/awesome-vite](https://github.com/vitejs/awesome-vite)
