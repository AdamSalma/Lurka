import Express from "express";
import request from "request";
import options from '../config/requestHeaders'


const router = Express.Router();

router.get('/', function(req, res, next){
    const { resource } = req.query

    options.url = unescape(resource)
    options.headers["Host"] = "i.4cdn.org"

    request.get(options).pipe(res).on('error', function(err){
        console.error(`Proxy error: ${err.message}`)
        throw err
    });
})

export default router
