import Express from 'express';

const router = Express.Router();

router.use('/4chan', require('./4chan'));
router.use('/reddit', require('./reddit'));

export default router