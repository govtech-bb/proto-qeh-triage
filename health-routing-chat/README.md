# Health routing — chat + voice variant

One of three variants. Tests whether a conversational, voice-capable interface helps citizens (especially those with lower literacy or in distress) tell us what's wrong faster than a form does.

## Stakeholder

J — based on user research feedback that the original screen reads like a form, not like help.

## Journey

Single-page conversation, with three short-circuits:

1. `pages/index.html` — Bot opens with "Are you unwell? Tell me what's going on."
   - **Free-text fast path**: if the user types or speaks something that contains a warning sign (e.g. "pain in my chest and I'm too weak to stand", "lips turning blue", "want to die"), the bot skips every other question and routes straight to emergency.
   - **Pain fast path**: if the user says "I'm in pain" without naming a body part, the bot replies "Where's the pain?" and renders an inline tappable body diagram in a chat bubble.
   - **Breathing fast path**: if breathing/asthma is the topic, the bot shows the three-tier triage panel from the screenshot (green / amber / red) instead of a flat list of warnings.
   - **Default path**: pick a category, then warning chips, then parish chips → result page.
2. `pages/result.html` — Shared result page with embedded Leaflet map. Now also handles two new modes: **home** (advice card with "what to do at home" + "call back if any of these happen", no map) and **urgent-today** (parish-driven polyclinic or Sir Winston Scott Fast Track if after-hours).

## What's been built

- Loads `@govtech-bb/styles@1.0.0-alpha.16` from jsDelivr; uses `govbb-` chrome (header, official banner, alpha banner, footer)
- Custom chat UI built on design system tokens (no Tailwind, no bare colour values — every colour and spacing reads from `var(--color-...)` / `var(--spacing-...)`)
- **Smarter free-text matcher**: extracts both category AND warning signs in one pass against a `WARNING_KEYWORDS` table covering breathing, chest/stroke, severity, bleeding, allergic, mental health, pregnancy and child red-flag keywords. If any warning sign matches → skip everything, go to emergency.
- **Inline body diagram** rendered as a chat bubble when "pain" is mentioned without a body part. Same SVG and click logic as the body-diagram variant, scaled to 220px.
- **Three-tier triage** for breathing only — implements the green (home) / amber (today) / red (serious now) pattern from the screenshot, with severity-wins routing logic.
- **Voice in (mic)**: Web Speech API. Pulses red while listening, transcribes interim results into the input, auto-sends on stop. Cleanly disables itself in browsers without Speech API support.
- **Voice out (TTS)**: Web SpeechSynthesis API. Speaker toggle button next to the mic; default off so it doesn't startle users on shared computers; auto-enables the moment someone uses the mic ("if you talked to me, I'll talk back"). Picks the best available English voice (en-GB → en-US → any en-*).
- Accessibility: `role="log"` + `aria-live="polite"` on the message stream; `<button>` chips with focus rings; mic and TTS buttons have descriptive `aria-label`s that update with state; body-diagram regions are real `role="button"` with keyboard support.
- Same `assets/facilities.js` and `assets/router.js` as the other variants, extended with new data (warning-keyword extractor, body-part detector, tiered breathing data) and a new `home` / `urgent-today` mode in the router. The form and body variants are unchanged.

## Open questions

- The keyword matcher is intentionally dumb. For user testing, watch where it misroutes — that's the signal for whether real NLU/an LLM is worth the production cost.
- The voice talkback uses whatever English voice the browser ships with — typically a UK or US voice. There is no Bajan voice. If that breaks immersion in testing, the next step is to record audio clips, which is a different project.
- The three-tier triage currently only applies to breathing. If it tests well, it's worth extending to chest, allergic, child and mental-health categories.
- "en-BB" locale for SpeechRecognition isn't widely supported; it'll fall back to en-US transcription which may struggle with Bajan dialect. Worth flagging if testing reveals it.
- Should the mental-health route always offer the 24-hour Psychiatric Hospital line even when no warning signs are picked, in case the user's reluctant to tick a red-flag item?
- The "newborn fever" rule fires on any "baby fever" mention — the 3-month qualifier in the warning sign isn't being checked. For a real release this needs an age question first.

## Hero scenarios verified

- "I have a pain in my chest and I am too weak to stand" → matches "Too weak to stand" → emergency (QEH A&E)
- "cant breathe properly" → matches "Gasping, choking" → emergency
- "I'm in pain" → renders inline body diagram → user taps region → category resolved
- Breathing → three-tier triage → red ticked → emergency; amber ticked → polyclinic/Fast Track; green ticked → home advice page (no map)
