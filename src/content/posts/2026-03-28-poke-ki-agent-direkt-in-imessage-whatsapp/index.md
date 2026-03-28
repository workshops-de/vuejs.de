---
title: "Poke: Der KI-Agent, der direkt in deiner Messaging-App wohnt"
description: "Poke bringt KI-Agenten in deine Messaging-App. No-Code-Automatisierung für E-Mail, Kalender & mehr – direkt per Chat. Was das für Automation-Engineers bedeutet."
author: "Robin Böhm"
published_at: 2026-03-28T12:00:00.000Z
categories: "vuejs javascript frontend"
header_image: "header.jpg"
---

**TL;DR:** Poke ist eine Consumer-KI-Plattform, die keinen App-Download erfordert — der Agent arbeitet direkt in iMessage, WhatsApp, Telegram und SMS. E-Mail, Kalender, Reminders und Websuche per natürlichem Chat. Und das Geschäftsmodell zeigt, wohin der Markt für No-Code-AI-Agents gerade driftet.
Stell dir vor: Du öffnest kein separates KI-Tool mehr. Stattdessen tippt dir dein Assistent einfach in deinem bestehenden Chat — und erledigt Dinge, bevor du danach fragst. Genau das ist das Versprechen von **Poke**, einer neuen Consumer-AI-Plattform von The Interaction Company aus Palo Alto, die im September 2025 an den Start gegangen ist.
## Die wichtigsten Punkte
- 📅 **Verfügbar**: seit September 2025, aktiv weiterentwickelt (Februar 2026 Major Updates)
- 🎯 **Zielgruppe**: Consumer & Prosumer — explizit kein Dev-Tool, No-Code by Design
- 💡 **Kernfeature**: KI-Agent lebt in bestehenden Messaging-Kanälen, kein App-Download
- 🔧 **Integrationen**: E-Mail, Kalender, Dateien, Websuche, Gruppenchats
- 💰 **Finanzierung**: 15 Mio. Dollar Seed-Runde bei 100 Mio. Dollar Bewertung (General Catalyst, Village Global, Earlybird VC)
- 🔒 **Compliance**: SOC 2 Type II + CASA Tier 2 zertifiziert
## Was bedeutet das für AI-Automation-Engineers?
Die Architektur hinter Poke ist für uns besonders interessant — nicht wegen des Consumer-Fokus, sondern wegen des **Interaction-Layer-Paradigmas**, das hier demonstriert wird.
Poke macht etwas sehr Cleveres: Statt die Nutzer in eine neue App zu zwingen, trifft der Agent sie **dort, wo sie ohnehin täglich Stunden verbringen** — im Messaging. Das ist ein fundamentaler UX-Shift, den Automation-Engineers kennen sollten:
```
Alter Ansatz:  User → App → AI → Ergebnis
Poke-Ansatz:   User ← AI (im bestehenden Kanal) → Ergebnis
```
Im Workflow bedeutet das: **Proaktivität als Design-Prinzip**. Poke wartet nicht auf Eingaben — es scannt verbundene Accounts (E-Mail, Kalender), identifiziert relevante Aufgaben und schickt proaktiv Benachrichtigungen. Das entspricht einem **Event-Driven-Agent-Pattern**, das wir aus n8n oder Make kennen, aber für den Consumer-Markt verpackt.
### Technische Details (verifiziert)
Was Poke konkret kann:
- **E-Mail-Management**: Zusammenfassungen, Antworten, Rechnungserkennung
- **Kalender-Steuerung**: Meeting-Scheduling per Chat, Gruppenreminder
- **Websuche mit verifizierten Quellen**: direkt im Chat
- **Dateiverarbeitung**: Integration in bestehende Dokumenten-Workflows
- **Gruppenchat-Intelligenz**: versteht Konversationskontext, reagiert auf Mentions, generiert Bilder
Die Beta-Phase zeigte: Nutzer tauschten über **750.000 Nachrichten** mit Poke aus — ein starkes Signal für Adoption in der Zielgruppe.
## Der WhatsApp-Faktor: Was Automation-Engineers wissen müssen
Laut verfügbaren Berichten wurde Poke zeitweise bei **WhatsApp gesperrt** — mutmaßlich im Kontext der Meta-Antitrust-Untersuchungen, die den Zugang zu WhatsApp-APIs für Drittanbieter betreffen. Das ist ein kritischer Hinweis für alle, die Automatisierungs-Workflows auf proprietären Messaging-Plattformen aufbauen:
⚠️ **Platform Risk ist real.** Wer Automatisierungen auf WhatsApp, Instagram oder anderen Meta-Diensten aufbaut, muss die Plattformrisiken einkalkulieren. Das betrifft nicht nur Startups wie Poke — es betrifft auch **jede n8n- oder Make-Integration**, die auf WhatsApp-Business-APIs setzt.
**Empfehlung für euren Stack:**
- Immer Platform-agnostische Fallback-Kanäle einbauen (Telegram, E-Mail, SMS)
- WhatsApp-Business-API nur über offizielle Meta-Partner nutzen
- Bei kritischen Workflows: Multi-Channel-Setup von Anfang an
## Poke vs. bestehende Automation-Stacks
Die Integration in deinen Workflow könnte so aussehen:
**Poke als Frontend-Layer** → `Webhook` → n8n/Make → eigene Backends
```
iMessage/SMS
    ↓
Poke AI Agent
    ↓ (Webhook/API)
n8n Workflow
    ↓
Datenbank / CRM / Slack / E-Mail
```
Das spart konkret die Entwicklung einer eigenen Conversational UI — Poke übernimmt den natürlichsprachlichen Eingabe-Layer, während eure Automatisierungs-Engine im Hintergrund die Logik steuert.
**Wo Poke hingegen nicht in klassische Automation-Stacks passt:**
- Keine direkten API-Hooks für Developer (noch)
- Keine Custom-Skills im Sinne eines Plugin-Systems (wie Claude CoWork)
- Consumer-First bedeutet: weniger Kontrolle über den Agent-Reasoning-Layer
## Praktische Nächste Schritte
1. **Poke ausprobieren**: Account unter [poke.com/get-started](https://poke.com/get-started) anlegen und eigene Messaging-Workflows testen — best Practice für Competitive Intelligence
2. **n8n als Backbone**: Wenn ihr ähnliche proaktive Agent-Patterns bauen wollt, ist n8n mit Event-Trigger + AI-Node der schnellste Weg in die Produktion
3. **Platform Risk Review**: Checkt eure bestehenden WhatsApp-Integrations auf Business-API-Compliance — der Poke-Fall ist ein Warnschuss