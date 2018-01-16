console.log("Lurka: Starting app 2...")
if (process.env.NODE_ENV != "production") {
    // Enable es6+
    require('babel-register');
}

// Set global variables etc
require('./setup');

// Start the application
require('./app');
