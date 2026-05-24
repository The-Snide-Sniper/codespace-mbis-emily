Run hit detection unit test (Node.js):

From project root (minigame/):

node tests/hit.test.js

Expected outcome:
- If src/hit.js is not implemented, Node will throw a module not found or tests will fail (RED). Implement isHit(point, target) in src/hit.js to return true when point lies within target circle.

Public interface expected in src/hit.js:

module.exports = {
  isHit: function(point, target) { /* ... */ }
};

Test cases covered:
- center, border, outside, offset target, negative coordinates

Once implemented, run the test again to get GREEN.
