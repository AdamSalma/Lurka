const env = process.env.NODE_ENV

export default {
  env: env || 'development',
  prodEnv: env === 'production' || env === "prod",
  meta: {
    title: 'Lurka'
  },
  server: {
    schema: 'http',
    host: 'localhost',
    port: process.env.PORT || 3000
  }
};
