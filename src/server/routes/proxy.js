import Express from "express";
import request from "request";
import proxy from '-/config/proxy'

// Replace some request headers. Need new object otherwise modifies original.
const config = { headers: Object.assign({}, proxy.headers, {
    "Host": "i.4cdn.org",
    "Accept": "image/webp,image/*,*/*;q=0.8",
    "Accept-Encoding": "gzip, deflate, sdch"
})}

const router = Express.Router();

router.get('/', function(req, res, next){
    config.url = unescape(req.query.resource)

    request.get(config).pipe(res).on('error', err => {
        console.error(`Proxy error: ${err.message}`)
        throw err
    });
})

export default router
