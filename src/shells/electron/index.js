// Enable electron to access app dependencies (not just dev-deps)
var node_modules = require('path').join(__dirname, "../../..", "build", "node_modules")
require('module').globalPaths.push(node_modules);

// Enable es6+
require('babel-register');

// Set global variables etc
require('./setup');

// Start the application
require('./app');
