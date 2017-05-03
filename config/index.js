const server = {
  schema: 'http',
  host: 'localhost',
  port: 3000
}

server.url = `${server.schema}://${server.host}:${server.port}/`

var config = {
  env: process.env.NODE_ENV || 'development',
  inProduction: process.env.NODE_ENV === 'production' || process.env.NODE_ENV === "prod",
  meta: {
    title: 'Lurka',
    version: require('../package.json').version
  },
  server: server,
}

module.exports = module.exports.default = config
