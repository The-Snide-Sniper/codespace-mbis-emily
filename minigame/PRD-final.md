# Crosshair Targeting Minigame — PRD

## 1. Context & Purpose

### Purpose & Problem Statement
A lightweight, standalone web prototype to measure and collect player aiming accuracy across configurable difficulty presets. Designers and researchers need a repeatable, fast way to gather quantitative data to guide balance decisions; current ad-hoc testing is slow and inconsistent.

### Target Users
- Game designers and playtesters who need to iterate on aim/balance quickly.
- Researchers or instructors running controlled playtests.
- Casual players participating in anonymous practice sessions.

### Goals & Success Metrics

| Goal | Metric | Target |
|------|--------|--------|
| Enable rapid balance iteration | Time to apply and test new preset | < 1 day to update preset file and collect new data |
| Collect clean aiming telemetry | Attempts with valid telemetry per preset | >= 200 attempts per preset in initial playtests |
| Demonstrate clear difficulty separation | Measurable shift in hit rate / distance distributions | Statistically significant separation between presets |

---

## 2. Features & Scope

### User Stories

1. As a playtester, I want to open a page and immediately play an endless practice session, so I can provide many attempts quickly.
2. As a designer, I want presets loaded from a server with a local fallback, so presets can be tuned without redeploying the page.
3. As a player, I want the crosshair to spawn offscreen and move, so I can practice timing my clicks.
4. As a player, I want a first click to rotate the crosshair (configurable fixed 90° option) and a second click to lock the aim, so the test is a two-step skill challenge.
5. As a designer, I want adjustable parameters (target size, initial speed, after-click speed multiplier sampled lognormally, angle behavior, variability), so difficulty is tunable.
6. As a designer, I want visual cues (crosshair arm indicating direction + circle stretch/squish indicating speed change) so players perceive upcoming motion.
7. As an analyst, I want telemetry batched and uploaded, so network impact is minimized and data is collected reliably.
8. As a privacy-conscious owner, I want ephemeral anonymous session IDs per load, so no personal data is captured.

### Scope Boundaries

**In scope:**
- Standalone responsive HTML5 Canvas page implementing the two-click flow and static targets.
- Server-driven presets with config.json fallback and built-in defaults.
- Lognormal-sampled after-click speed multiplier and fixed-angle option.
- Visual crosshair indicator and minimal Hit/Miss feedback.
- Batched telemetry (hit/miss, preset ID, session ID) uploaded when threshold reached or on session end.

**Out of scope:**
- Account-based tracking or persistent profiles.
- Embeddable module or host callbacks (MVP is standalone).
- Analytics dashboards or advanced pipeline (data for offline analysis).

---

## 3. User Experience

### User Journey
1. User opens the page; presets attempted from server, falling back to local defaults.
2. An ephemeral session ID is generated for this page load.
3. A target appears on the canvas; crosshair spawns offscreen and moves at initial speed.
4. First click: crosshair rotates (fixed 90° option) toward the target and speed changes (multiplier sampled from lognormal). Visual cue shows new direction and stretch/squish encodes speed change.
5. Second click: crosshair locks; system evaluates hit if center is within target radius and immediately displays Hit or Miss.
6. Telemetry for the attempt is stored locally; batches are uploaded when N is reached or on session end.
7. Play continues until user closes the page.

### Acceptance Criteria
- Presets load from server; local fallback used if unavailable.
- Crosshair two-click flow operates as described; hit detection uses center-within-radius rule.
- After-click speed multiplier uses lognormal multiplier sampling (configurable mu/sigma).
- Visual indicators render the upcoming direction and relative speed change.
- Telemetry records contain hit/miss, preset ID, and session ID; batching/upload behavior functions as configured.
- Canvas scales responsively with window size while preserving gameplay behavior.

---

## 4. Constraints

### Regulatory / Legal
None for prototype. No personal data captured; session IDs are anonymous and ephemeral.

### Platform & Standards
- Target modern desktop/mobile browsers supporting HTML5 Canvas.
- Responsive behavior: canvas equals window size and adapts to orientation changes.

### Performance Requirements
- Smooth rendering at typical browser frame rates (target 60 FPS on common hardware); degrade gracefully on constrained devices.

### Assumptions & Risks

| Assumption | Risk if wrong |
|-----------|---------------|
| Presets can be hosted and reachable during playtests | Slow or unreachable presets slow iteration; local fallback mitigates risk |
| Playtesters use modern browsers | Legacy browsers may misrender and reduce data quality |
| Batched upload will not lose significant data | Network failures before upload could cause data loss; increase local persistence if required |

---

## 5. Priorities (Delivery Plan)

### Must-have (MVP)
- Responsive standalone HTML5 Canvas page with two-click aiming and hit detection.
- Server-driven presets with local fallback and built-in defaults.
- Lognormal-sampled after-click speed multiplier and fixed-angle option.
- Visual crosshair indicators and minimal Hit/Miss feedback.
- Batched telemetry storage and upload on threshold/session end.

### Can wait
- In-page preset editor with push-to-server flow.
- Cursor-path replay visualization.
- Embeddable JS module and integration hooks.
- Analytics dashboards.

### Order of work
1. Implement core gameplay and hit detection with built-in defaults.
2. Add preset fetching and config.json fallback.
3. Implement lognormal multiplier sampling and visual indicators.
4. Implement telemetry batching and upload logic.
5. Polish visuals, run playtests, and iterate.

---

## Further Notes
- Design telemetry schema to be lightweight and anonymous.
- Capture sufficient attempts per preset (>=200) for statistical analysis.
- Keep server-side presets editable for rapid iteration during playtests.
