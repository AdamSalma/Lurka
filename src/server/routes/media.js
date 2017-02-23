import Express from "express";
import request from "request";
import Axios from "axios";
import headers from '../config/requestHeaders'

const router = Express.Router();
var options;

router.get('/', function(req, res, next){
    const { url, provider } = req.query
    
    options = headers.chan
    options.headers["host"] = "i.4cdn.org"
    options.url = unescape(url)

    request.get(options).pipe(res).on('error', function(err){
        console.error("Caught media error!")
        console.log(err.message)
        throw err
    });
})

export default router
