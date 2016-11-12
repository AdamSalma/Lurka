import Express from 'express';

const router = Express.Router();

router.use('/4chan', require('./4chan'));
router.use('/reddit', ()=>log.warn("Reddit request. make provider handler"));

module.exports = router