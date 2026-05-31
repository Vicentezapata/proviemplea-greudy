/* eslint-disable no-console */
// Logger simple para registrar eventos del sistema
const logger = {
  info: (message) => {
    console.log(`[INFO] ${new Date().toISOString()} - ${message}`);
  },
  error: (message, err = null) => {
    console.error(`[ERROR] ${new Date().toISOString()} - ${message}`);
    if (err) console.error(err.stack);
  },
  warn: (message) => {
    console.warn(`[WARN] ${new Date().toISOString()} - ${message}`);
  }
};

module.exports = logger;