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
}

module.exports = module.exports.default = config
