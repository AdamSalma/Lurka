// Enable electron to access app dependencies (not just dev-deps)
require('module').globalPaths.push(
    require('path').join(__dirname, "../../..", "build", "node_modules")
);

// Enable es6+
require('babel-register');

// Set global variables etc
require('./setup');

// Start the application
require('./app');
