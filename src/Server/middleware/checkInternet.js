import { lookup } from 'dns'

export default function (req, res, next) {
    lookup('4chan.org', function(err) {
        if (err && err.code == "ENOTFOUND") {
            err.message = "No internet connection"
            err.status = 503
            log.error(err.message)
            next(err)
        } else {
            next()
        }
    })
}
