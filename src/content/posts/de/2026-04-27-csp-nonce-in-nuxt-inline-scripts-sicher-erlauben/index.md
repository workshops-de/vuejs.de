---
title: "CSP Nonce in Nuxt: Inline Scripts sicher erlauben"
description: "CSP Nonce in Nuxt: Inline Scripts sicher erlauben"
author: "Robin Böhm"
published_at: 2026-04-27T12:00:00.000Z
categories: "vuejs javascript frontend"
header_image: "https://images.unsplash.com/photo-1614064548237-096f735f344f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MTM4MjZ8MHwxfHNlYXJjaHw5fHxDU1AlMjBOb25jZSUyMGluJTIwTnV4dCUyMFRMRFIlMjBDb250ZW50JTIwU2VjdXJpdHl8ZW58MXwwfHx8MTc3NzI5NDAxMHww&ixlib=rb-4.1.0&q=80&w=1080"
---

**TL;DR:** Content Security Policy blockiert standardmäßig Inline-Scripts – und bricht damit viele Nuxt-Apps. Jakub Andrzejewski vom Nuxt Ecosystem Team zeigt, wie CSP Nonces dieses Dilemma lösen, ohne die Sicherheit zu opfern.

Inline-Scripts sind in Nuxt-Anwendungen unvermeidbar: Vue-Hydration, `<script setup>` und serverseitig gerenderte Daten landen alle als Inline-Code im HTML. Eine strict Content Security Policy (CSP) blockiert genau das – und schützt damit vor XSS-Angriffen, macht aber gleichzeitig die App unbrauchbar. Das klassische Workaround `'unsafe-inline'` hebelt den Schutz vollständig aus. CSP Nonces sind der saubere Mittelweg: Ein kryptografisch sicheres, einmaliges Token wird serverseitig pro Request generiert, im CSP-Header bekannt gemacht und in alle erlaubten `<script>`-Tags injiziert. Angreifer-Skripte ohne dieses Token werden vom Browser blockiert.

## Was ist neu?

Andrzejewski beschreibt in seinem Artikel die manuelle Node.js-Implementierung als Ausgangspunkt und stellt dann das `@nuxtjs/security`-Modul als vollautomatische Alternative vor. Nach der Installation via `npx nuxi@latest module add security` genügen wenige Zeilen in der `nuxt.config.ts`, um die Nonce-Generierung zu aktivieren. Das Modul übernimmt danach die komplette Arbeit: Es generiert den Nonce serverseitig pro Request, setzt den korrekten CSP-Header und injiziert das Token automatisch in alle Nuxt-internen Inline-Scripts – inklusive Vue-Hydration und Setup-Code. Für eigene Inline-Scripts steht das Composable `useNonce()` bereit, das von nuxt-security automatisch bereitgestellt wird. Der manuelle Weg ist fehleranfällig; vergisst man ein einzelnes `<script>`-Tag, blockiert die CSP ohne offensichtliche Fehlermeldung.

## Was bedeutet das für Vue- und Nuxt-Entwickler?

Für Vue-3-Projekte mit Nuxt ist CSP Nonce die empfohlene Strategie, um Inline-Script-Anforderungen und Sicherheitsanforderungen zu vereinbaren – gerade in Enterprise-Umgebungen, wo Sicherheits-Audits zunehmend auf strict CSP-Header bestehen. Das `nuxt-security`-Modul nimmt den größten Implementierungsaufwand ab und reduziert das Risiko von Konfigurationsfehlern erheblich. Wer `'unsafe-inline'` noch in seiner CSP verwendet, sollte die Migration ernsthaft in Betracht ziehen: Der Wechsel zu Nonces ist mit dem Modul überschaubar und der Sicherheitsgewinn signifikant.

## Quellen & Weiterführende Links

- 📰 [Original-Artikel – Jakub Andrzejewski auf DEV.to](https://dev.to/jacobandrewsky/how-to-safely-allow-inline-scripts-without-breaking-security-with-csp-nonce-3a2j)
- 📚 [Nuxt Security Modul – Offizielle Docs](https://security.nuxt.com)
- 📚 [MDN – CSP script-src nonce](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src#nonce_source)
- 🎓 **Workshops & Kurse** (verifiziert via API):
  - [Nuxt.js 3 Intensiv-Schulung](https://workshops.de/seminare-schulungen-kurse/nuxt-js-3-intensiv-workshop) — Rendering-Modi, Routing, Composables und Nitro praxisnah in einem realen Projekt
  - [Vue.js: Modul 1 – Komponenten, Reaktivität & Schnittstellen](https://workshops.de/seminare-schulungen-kurse/vuejs-modul-1) — Solide Vue-3-Grundlagen als Basis für sichere Nuxt-Anwendungen