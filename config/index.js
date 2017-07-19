const pkg = require('../package.json');
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
    version: require('../package.json').version
  },
  server: {
    schema: 'http',
    host: 'localhost',
    port: 3000
  },
  electron: {
    devPerformance: false,
    main: {
      show: false,
      title: "Lurka",
      titleBarStyle: 'hidden',
      autoHideMenuBar: true
    },
    preloader: {
      width: 350,
      height: 425,
      modal: true,
      titleBarStyle: 'hidden',
      frame: false,
      title: "Lurka"
    }
  }
}

config.server.url = `${config.server.schema}://${config.server.host}:${config.server.port}/`

module.exports = module.exports.default = config
