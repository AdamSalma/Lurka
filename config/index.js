export default {
  env: process.env.NODE_ENV || 'development',
  meta: {
    title: 'Lurka'
  },
  server: {
    port: process.env.PORT || 3000,
    host: 'localhost'
  }
};
