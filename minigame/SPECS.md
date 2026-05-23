# Crosshair Targeting Minigame — SPECS

## Problem Statement
Designers need a lightweight, standalone web prototype to measure and collect player aiming accuracy across configurable difficulty presets. The prototype must enable rapid playtesting of a two-click aiming flow and produce anonymous, lightweight accuracy logs for offline analysis.

## Solution
A responsive HTML5 Canvas single-page prototype implementing a two-click crosshair aiming minigame. Presets are loaded from a local config.json fallback; gameplay runs on desktop browsers with mouse/tap and optional keyboard controls. Each page load creates an ephemeral session ID. Attempts are recorded in-memory and can be exported for offline analysis.

## User Stories
1. As a playtester, I want to open a page and immediately play an endless session, so I can provide many attempts quickly.
2. As a player, I want the crosshair to spawn offscreen and move, so I can practice timing my clicks.
3. As a player, I want a first click to rotate the crosshair (configurable fixed 90° option) and a second click to lock the aim, so the test is a two-step skill challenge.
4. As a player, I want keyboard support (Space/Enter) for the second-click lock, so I can use keys as an alternative input.
5. As the designer, I want adjustable parameters (target size, initial speed, after-click speed multiplier sampled lognormally, angle behavior, optimal time between clicks, variability), so difficulty is tunable.
6. As the designer, I want presets for parameters that can be filled in automatically, so I can choose difficulty settings quickly.
7. As a player, I want visual cues (crosshair arm indicating direction + circle stretch/squish indicating speed change) so I can predict upcoming motion.
8. As an analyst, I want accuracy logs batched and exported, so network impact is minimized and data is collected reliably.
9. As a privacy-conscious player, I want ephemeral anonymous session IDs per load, so no personal data is captured.
10. As a privacy-conscious player, I want the option to disable data collection entirely, so no data at all is captured.

## Implementation Decisions
- Platform: Desktop-first web app (modern browsers). Mobile compatibility may be improved later but is not prioritized.
- Input: Primary mouse/tap with optional keyboard (Space/Enter) for lock. Touch taps map to click flow.
- Presets: Load from local config.json located beside the page; no remote fetch in this MVP. Built-in defaults embedded in code are used if config.json missing or invalid.
- Session ID: Ephemeral per page load; generated on startup and stored in memory only.
- Accuracy log: In-memory batching only (no localStorage persistence). Data collection can be disabled via a user-facing toggle. Each attempt record contains: timestamp, session_id, preset_id, hit_bool, target_params (size, speeds, angle), timing metrics (time between clicks), and raw aim offset (distance from target center at lock).
- Sampling: After-click speed multiplier sampled from a lognormal distribution parameterized by mu and sigma in config. Provide deterministic RNG seed option for reproducible playtests.
- Hit rule: Point-in-circle; evaluate whether crosshair center is within target radius at lock.
- Visuals: Canvas scales to window size while preserving gameplay coordinate normalization (use device-independent logical coordinates). Crosshair arm and circle deformation encode direction and relative speed change.
- Accuracy Log Export: Expose an export/download button for collected in-memory batches (CSV/JSON). Upload endpoint configuration is supported but is a no-op by default in MVP.
- Error handling: Robust fallback to built-in defaults if config.json parsing fails. Gracefully degrade rendering on low frame rates.

## Testing Decisions
- Test external behavior only: tests simulate input events and assert hit/miss outcomes, accuracy log fields, and preset application.
- Modules to test:
  - RNG & Lognormal sampling (unit tests for distribution properties / deterministic seed behavior).
  - Hit detection logic (unit tests for point-in-circle with varying scales).
  - Preset loading and fallback behavior (unit tests covering valid/invalid/missing config.json).
  - Input flow (integration test simulating the two-click flow and verifying state transitions and accuracy log recording).
- Manual playtest: run live in browser to validate visual cues, responsiveness, and feel.
- No end-to-end server upload tests in MVP (upload is a no-op by default); provide a test stub for upload logic.

## Out of Scope
- Account-based tracking or persistent user profiles.
- Server-hosted presets, dashboards, or analysis pipelines.
- Advanced animations, cursor-path replay, or complex persistence strategies.

## Further Notes
- Keep accuracy log schema minimal to avoid privacy concerns; do not include IP or device identifiers.
- If reliability concerns appear during playtests, switch accuracy log to localStorage-persisted batching (configurable) and add retry/backoff for uploads.
- Consider adding a simple in-page preset editor in future iterations to accelerate designer-driven tuning.

---
Generated decisions summary:
- Desktop prioritized; mouse/tap + keyboard supported; accuracy logs in-memory only; presets local-only; overlay text for Hit/Miss; ephemeral session IDs.

