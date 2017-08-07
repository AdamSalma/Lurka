const pkg = require('-/package.json');
const env = process.env.NODE_ENV;

var config = {
  env: {
    raw: env,
    production: env === 'production' || env === 'prod',
    development: env === 'development' || env === 'dev',
    testing: env === 'testing' || env === 'test'
  },
  meta: {
    title: pkg.name,
    version: pkg.version
  },
  electron: {
    devPerformance: false,
    main: {
      show: false,
      title: "Lurka",
      titleBarStyle: 'hidden',
      autoHideMenuBar: true,
      frame: true
    },
    preloader: {
      width: 250,
      height: 265,
      modal: true,
      titleBarStyle: 'hidden',
      frame: false,
      title: "Lurka"
    }
  },
  paths: require('./paths'),
  server: {
    schema: 'http',
    host: 'localhost',
    port: 3000
  }
}

config.server.url = `${config.server.schema}://${config.server.host}:${config.server.port}/`

module.exports = module.exports.default = config
