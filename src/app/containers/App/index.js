if (!module.hot || process.env.NODE_ENV === 'production') {
    console.log("PRODUCTION")
    module.exports = require('./App').default
} else {
    module.exports = require('./HotLoader').default
    console.log(module.exports)
}
