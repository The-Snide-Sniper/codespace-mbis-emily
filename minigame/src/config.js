const fs = require('fs');
const path = require('path');

const DEFAULT_PRESETS = [
  { name: 'default', size: 10, initial_speed: 1, after_click_multiplier: 1.0, angle: 0 }
];

function readJsonFile(filepath) {
  try {
    const txt = fs.readFileSync(filepath, 'utf8');
    return JSON.parse(txt);
  } catch (e) {
    return null;
  }
}

function getPresets(options) {
  const filepath = options && options.filepath ? options.filepath : path.join(__dirname, '..', 'config.json');
  const cfg = readJsonFile(filepath);
  if (cfg && Array.isArray(cfg.presets)) return cfg.presets.slice();
  return DEFAULT_PRESETS.slice();
}

module.exports = { getPresets, DEFAULT_PRESETS, readJsonFile };