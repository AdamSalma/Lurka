global.log = require('./services/logger');
if (process.env.NODE_ENV !== "production") // es6 used automatically for production; is bundled.
	require('babel-register');
require('./server');
