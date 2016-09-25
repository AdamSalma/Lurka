process.on('uncaughtException', function (err) {
   console.log("Internal error occured");
   console.log(err.stack);
});

require('babel-register');
require('css-modules-require-hook')({
  generateScopedName: '[name]__[local]-[hash:base64:4]',
  mode: 'local',
  rootDir: './client'
});
require('./bin/www');

