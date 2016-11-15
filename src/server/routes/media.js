import Express from "express";
const router = Express.Router();

router.get('/', function(res, req, next){
    log.warning("Media requested")
})

export default router