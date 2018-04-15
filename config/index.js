const pkg = require('-/package.json');
const env = process.env.NODE_ENV;

var config = {
  env: {
    raw: env,
    production: env === 'production' || env === 'prod',
    development: env === 'development' || env === 'dev',
    dev: env === 'development' || env === 'dev',
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
      frame: true,
      darkTheme: true,
      "node-integration": "iframe",
      nodeIntegration: "iframe",
      webPreferences: {
        // // Boolean - When setting `false`, it will disable the same-origin policy (Usually using testing websites by people), and set `allowDisplayingInsecureContent` and `allowRunningInsecureContent` to `true` if these two options are not set by user. Default is `true`.
        webSecurity: false,
        "web-security": false
        // // Boolean - Allow an https page to display content like images from http URLs. Default is `false`.
        // allowDisplayingInsecureContent: true,

        // // Boolean - Allow a https page to run JavaScript, CSS or plugins from http URLs. Default is `false`.
        // allowRunningInsecureContent: true,

      }
    },
    preloader: {
      width: 250,
      height: 265,
      modal: true,
      titleBarStyle: 'hidden',
      frame: false,
      title: "Lurka",
      transparent: true
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
