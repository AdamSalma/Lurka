if (process.env.NODE_ENV !== "production") {
    // Enable es6+
    console.log('Registring babel');
    require('babel-register');
}

// Set global variables etc
require('./setup');

// Start the application
require('./app');
