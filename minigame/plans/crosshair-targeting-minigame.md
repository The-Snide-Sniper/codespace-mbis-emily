# Plan: Crosshair Targeting Minigame

> Source PRD: SPECS.md

## Architectural decisions

- **Platform / Routes**: Single-page HTML5 Canvas prototype served as index.html; no server-side routes for MVP.
- **Schema (accuracy record)**: { timestamp, session_id, preset_id, hit_bool, target_params: {size, initial_speed, after_click_multiplier, angle}, timing_ms, raw_offset_px }
- **Key models**: Session (ephemeral), Preset (config), Attempt/Record (accuracy log entry).
- **Auth / Privacy**: No auth; ephemeral per-load session_id; data collection can be disabled.
- **Storage / Export**: In-memory batching; export as CSV/JSON via download button; upload endpoint supported as no-op by default.
- **Presets**: Load from local `config.json` next to page; fallback to built-in defaults.
- **RNG**: Lognormal sampling for after-click multiplier; no deterministic-seed option in MVP.

---

## Phase 1: Core playable loop (vertical slice)

**User stories**: 1, 2, 3, 9

### What to build
A minimal playable page: canvas that scales to window, crosshair spawns offscreen and moves, two-click flow where first click rotates (or toggles fixed 90°), second click locks and evaluates Hit/Miss using point-in-circle. Generate ephemeral session ID and record each attempt in an in-memory batch.

### Acceptance criteria
- [ ] Page loads and immediately begins an endless session.
- [ ] Crosshair spawns offscreen and moves; two-click flow works end-to-end.
- [ ] Hit/Miss evaluation recorded in in-memory attempts with session_id and basic target_params.

---

## Phase 2: Presets & config loading

**User stories**: 5, 6

### What to build
Implement loading presets from local `config.json` with robust fallback to built-in defaults. UI to select a preset. Implement lognormal sampling for after-click speed multiplier.

### Acceptance criteria
- [ ] `config.json` is read when present; invalid/missing file falls back to built-in defaults.
- [ ] Preset selection applies parameters to gameplay immediately.
- [ ] Lognormal sampling applies multiplicative speed variation per attempt.

---

## Phase 3: Visual cues & input alternatives

**User stories**: 4, 7

### What to build
Add crosshair arm indicating direction and circle deformation to encode speed change. Add keyboard support (Space/Enter) mapped to second-click lock. Ensure canvas coordinate normalization and responsive scaling.

### Acceptance criteria
- [ ] Crosshair arm and circle deformation visibly reflect direction and speed.
- [ ] Space/Enter lock behaves identically to mouse/tap second click.
- [ ] Canvas scales while preserving gameplay coordinates.

---

## Phase 4: Accuracy logging, batching & export

**User stories**: 8, 10

### What to build
Batch attempts in-memory and provide UI controls: toggle data collection on/off, export/download button (CSV/JSON). Implement a configurable upload endpoint as a no-op by default and a simple stub for future tests.

### Acceptance criteria
- [ ] Toggle disables collection when off; no attempts recorded.
- [ ] Export button downloads collected attempts as CSV and JSON matching the schema.
- [ ] Upload endpoint exists but is a no-op by default; stub is testable.

---

## Phase 5: Tests and distribution checks

**User stories**: testing decisions

### What to build
Unit tests for lognormal sampling behavior (statistical checks), hit detection (point-in-circle) and preset loading. Integration tests to simulate two-click flow asserting state transitions and log entries.

### Acceptance criteria
- [ ] Unit tests for sampling behavior and hit detection pass.
- [ ] Integration test simulating two-click flow records an attempt and Hit/Miss as expected.

---

## Notes & next steps
- After approval, implement Phase 1 first and add a minimal test harness for the two-click flow.
- Plan file can be updated as implementation uncovers constraints.

---

*Generated from SPECS.md*
