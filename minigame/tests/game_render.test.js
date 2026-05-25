const assert = require('assert');
const game = require('../src/game');

function makeMockCtx() {
  const calls = [];
  return {
    calls,
    beginPath: function(){ this.calls.push('beginPath'); },
    arc: function(x,y,r){ this.calls.push(`arc ${x} ${y} ${r}`); },
    fill: function(){ this.calls.push('fill'); },
    stroke: function(){ this.calls.push('stroke'); },
    moveTo: function(x,y){ this.calls.push(`moveTo ${x} ${y}`); },
    lineTo: function(x,y){ this.calls.push(`lineTo ${x} ${y}`); }
  };
}

function run() {
  console.log('Running game render integration test...');
  game.reset();
  game.spawnCrosshair({size: 7});
  const ctx = makeMockCtx();
  game.setClickPoint({x:100,y:120});
  game.render(ctx);

  const hasArc = ctx.calls.some(c => c.startsWith('arc'));
  const hasMoveTo = ctx.calls.some(c => c.startsWith('moveTo'));
  const hasLineTo = ctx.calls.some(c => c.startsWith('lineTo'));

  assert.ok(hasArc, 'target arc should be drawn');
  assert.ok(hasMoveTo, 'crosshair moveTo should be called');
  assert.ok(hasLineTo, 'crosshair lineTo should be called');
  console.log('GAME RENDER TEST PASSED');
}

try {
  run();
} catch (e) {
  console.error('TEST FAILED:', e.message || e);
  process.exit(1);
}