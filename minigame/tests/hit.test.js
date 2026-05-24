/* Simple unit tests for point-in-circle hit detection.
 * Expects module at ../src/hit.js exporting function isHit(point, target)
 * point: {x,y}
 * target: {x,y,radius}
 */
const assert = require('assert');
const { isHit } = require('../src/hit');

function run() {
  console.log('Running hit detection tests...');
  // point at center
  assert.strictEqual(isHit({x:0,y:0},{x:0,y:0,radius:10}), true, 'center should hit');
  // point at border
  assert.strictEqual(isHit({x:10,y:0},{x:0,y:0,radius:10}), true, 'border should hit');
  // just outside
  assert.strictEqual(isHit({x:10.001,y:0},{x:0,y:0,radius:10}), false, 'outside should miss');
  // offset target
  assert.strictEqual(isHit({x:15,y:5},{x:10,y:5,radius:5}), true, 'offset hit');
  // negative coords
  assert.strictEqual(isHit({x:-3,y:-4},{x:0,y:0,radius:5}), true, 'negative coords hit');
  console.log('ALL TESTS PASSED');
}

try {
  run();
} catch (e) {
  console.error('TESTS FAILED:', e.message || e);
  process.exit(1);
}
