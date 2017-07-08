global.log = require('./utils/logger');

if (process.env.NODE_ENV !== "production" || 'function' !== typeof Map)
	require('babel-register');

require('./server');
