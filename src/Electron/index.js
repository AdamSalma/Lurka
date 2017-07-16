// Set global configuration
global.config = require('../../config');

// Enable electron to access app dependencies (not just dev-deps)
require('module').globalPaths.push(
    require('path').join(__dirname, "../../app", "node_modules")
);

// Enable es6+
require('babel-register');

// Start the application
require('./startup');

