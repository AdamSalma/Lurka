import Express from "express";
import request from "request";
import headers from '../config/requestHeaders'

const router = Express.Router();
var options;

router.get('/', function(req, res, next){
    const {url, provider} = req.query
    
    if (provider === "4chan") {
        options = headers.chan
        options.headers["host"] = "i.4cdn.org"
    }

    if (provider === "reddit") {
        options = headers.reddit
        // options.headers["host"] = "i.4cdn.org"
    }

    options.url = unescape(url)
    request.get(options).pipe(res);
})

export default router
