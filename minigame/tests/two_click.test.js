/* Integration test for two-click flow using public interface at ../src/game */
const assert = require('assert');
const game = require('../src/game');

function run() {
  console.log('Running two-click integration test...');
  game.reset();
  const session = game.startSession();
  assert.ok(session, 'session id returned');
  // Initially no attempts
  assert.strictEqual(game.getAttempts().length, 0, 'no attempts initially');

  // spawn crosshair (does not start game)
  game.spawnCrosshair({size: 5, speed: 1});
  assert.strictEqual(game.getState(), 'idle', 'initial state should be idle');

  // first click starts/turns the crosshair
  game.click();
  assert.strictEqual(game.getState(), 'turned', 'state should be turned after first click');

  // second click locks and records attempt
  game.click();
  assert.strictEqual(game.getState(), 'locked', 'state should be locked after second click');

  const attempts = game.getAttempts();
  assert.strictEqual(attempts.length, 1, 'one attempt recorded');
  const attempt = attempts[0];
  assert.ok('session_id' in attempt, 'attempt has session_id');
  assert.ok(typeof attempt.hit_bool === 'boolean', 'attempt has hit_bool');
  console.log('TWO-CLICK TEST PASSED');
}

try {
  run();
} catch (e) {
  console.error('TEST FAILED:', e.message || e);
  process.exit(1);
}
