// Set global configuration
global.config = require('config');

const { app_modules } = require('config/paths');

// Enable electron to access app dependencies (not just dev-deps)
require('module').globalPaths.push(app_modules);
