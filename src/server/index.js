global.log = require('./services/logger')
if (process.env.NODE_ENV !== "production") // isn't bundled; no es6
	require('babel-register');
require('./server');
