const env = process.env.NODE_ENV;

const server = {
  schema: 'http',
  host: 'localhost',
  port: 3000
}

server.url = `${server.schema}://${server.host}:${server.port}/`

var config = {
  env: {
    raw: env,
    production: env === 'production' || env === 'prod',
    development: env === 'development' || env === 'dev',
    testing: env === 'testing' || env === 'test'
  },
  meta: {
    title: 'Lurka',
    version: require('../package.json').version
  },
  server: server,
  electron: {
    main: {
      kiosk: true,
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

module.exports = module.exports.default = config
