const { isHit } = require('./hit');

let attempts = [];
let state = 'idle';
let session_id = null;
let _target = {x:0,y:0,radius:10};
let _currentPoint = {x:0,y:0};

module.exports = {
  reset: function() {
    attempts = [];
    state = 'idle';
    session_id = null;
    _target = {x:0,y:0,radius:10};
    _currentPoint = {x:0,y:0};
  },
  startSession: function() {
    session_id = Date.now().toString();
    return session_id;
  },
  getAttempts: function() {
    return attempts.slice();
  },
  spawnCrosshair: function(opts) {
    // Minimal: store target params or options if provided
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
        target_params: _target
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
