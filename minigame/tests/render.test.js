const assert = require('assert');
const render = require('../src/render');

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
  console.log('Running render tests...');
  const ctx = makeMockCtx();
  const state = {
    target: {x:50,y:60,radius:10},
    crosshair: {x:100,y:120}
  };
  render.draw(state, ctx);

  // Expect target arc and crosshair lines to have been drawn
  const hasArc = ctx.calls.some(c => c.startsWith('arc 50 60 10'));
  const hasMoveTo = ctx.calls.some(c => c.startsWith('moveTo 90 120') || c.startsWith('moveTo 100'));
  const hasLineTo = ctx.calls.some(c => c.startsWith('lineTo 110 120') || c.startsWith('lineTo 100'));

  assert.ok(hasArc, 'target arc should be drawn');
  assert.ok(hasMoveTo, 'crosshair moveTo should be called');
  assert.ok(hasLineTo, 'crosshair lineTo should be called');
  console.log('RENDER TEST PASSED');
}

try {
  run();
} catch (e) {
  console.error('TEST FAILED:', e.message || e);
  process.exit(1);
}