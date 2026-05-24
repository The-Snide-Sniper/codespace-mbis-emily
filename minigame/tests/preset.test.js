const assert = require('assert');
const fs = require('fs');
const path = require('path');
const config = require('../src/config');

function run() {
  console.log('Running preset loading tests...');

  // Missing file should fall back to default
  const nonexist = path.join(__dirname, 'nonexistent_config.json');
  const presetsFallback = config.getPresets({filepath: nonexist});
  assert.deepStrictEqual(presetsFallback, config.DEFAULT_PRESETS, 'should fall back to default presets when file missing');

  // Loading from a real file
  const tmpPath = path.join(__dirname, 'tmp_config.json');
  const sample = { presets: [ { name: 'fast', size: 5, initial_speed: 2 } ] };
  fs.writeFileSync(tmpPath, JSON.stringify(sample), 'utf8');
  const loaded = config.getPresets({filepath: tmpPath});
  assert.deepStrictEqual(loaded, sample.presets, 'should load presets from provided config file');
  fs.unlinkSync(tmpPath);

  console.log('PRESET TESTS PASSED');
}

try { run(); } catch (e) { console.error('TEST FAILED:', e.message || e); process.exit(1); }