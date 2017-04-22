const env = process.env.NODE_ENV

export default {
  env: env || 'development',
  inProduction: env === 'production' || env === "prod",
  meta: {
    title: 'Lurka',
    version: require('../../package.json')
  },
  server: {
    schema: 'http',
    host: 'localhost',
    port: process.env.PORT || 3000
  }
};
