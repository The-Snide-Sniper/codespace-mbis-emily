const { isHit } = require('./hit');
const config = require('./config');

let attempts = [];
let state = 'idle';
let session_id = null;
let _target = {x:0,y:0,radius:10};
let _currentPoint = {x:0,y:0};

let _initial_speed = 1;
let _after_click_multiplier = 1.0;
let _angle = 0;

let _presets = config.getPresets ? config.getPresets() : [];
let _currentPreset = _presets.length ? _presets[0] : null;

function applyPreset(preset) {
  if (!preset) return;
  if (typeof preset.size === 'number') _target.radius = preset.size;
  if (typeof preset.initial_speed === 'number') _initial_speed = preset.initial_speed;
  if (typeof preset.after_click_multiplier === 'number') _after_click_multiplier = preset.after_click_multiplier;
  if (typeof preset.angle === 'number') _angle = preset.angle;
  _currentPreset = preset;
}

module.exports = {
  reset: function() {
    attempts = [];
    state = 'idle';
    session_id = null;
    _target = {x:0,y:0,radius:10};
    _currentPoint = {x:0,y:0};
    _initial_speed = 1;
    _after_click_multiplier = 1.0;
    _angle = 0;
    _presets = config.getPresets ? config.getPresets() : [];
    _currentPreset = _presets.length ? _presets[0] : null;
    if (_currentPreset) applyPreset(_currentPreset);
  },
  startSession: function() {
    session_id = Date.now().toString();
    return session_id;
  },
  getAttempts: function() {
    return attempts.slice();
  },
  getPresets: function() { return _presets.slice(); },
  selectPreset: function(name) {
    const p = _presets.find(x => x.name === name);
    if (p) applyPreset(p);
    return p || null;
  },
  spawnCrosshair: function(opts) {
    // apply current preset (if any) then override with opts
    if (_currentPreset) applyPreset(_currentPreset);
    if (opts && opts.size) _target.radius = opts.size;
    state = 'idle';
    // crosshair starts offscreen; for test, _currentPoint remains 0,0
  },
  // optional: allow tests to set a click point for determinism
  setClickPoint: function(pt) {
    if (pt && typeof pt.x === 'number' && typeof pt.y === 'number') _currentPoint = pt;
  },
  click: function() {
    if (state === 'idle') {
      // first click starts/turns
      state = 'turned';
    } else if (state === 'turned') {
      // second click locks and records an attempt
      const hit_bool = isHit(_currentPoint, _target);
      attempts.push({
        timestamp: Date.now(),
        session_id: session_id,
        hit_bool: hit_bool,
        target_params: Object.assign({}, _target),
        preset: _currentPreset ? Object.assign({}, _currentPreset) : null
      });
      state = 'locked';
    } else if (state === 'locked') {
      // after locking, reset to idle for next attempt
      state = 'idle';
    }
  },
  getState: function() {
    return state;
  }
};
