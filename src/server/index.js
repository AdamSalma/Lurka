global.log = require('./helpers/logger')
if (process.env.NODE_ENV !== "production")
	require('babel-register');
require('./server');
