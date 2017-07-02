import Express from 'express'

import getBoardlist from './getBoardlist'
import getBoard from './getBoard'
import getArchive from './getArchive'
import getThread from './getThread'

const router = Express.Router();

router.get('/', (req,res,next) => next(new Error("No subroute: '/api/4chan'")));
router.get('/boards', getBoardlist);
router.get('/board/:boardID', getBoard);
router.get('/board/:boardID/archive', getArchive);
router.get('/board/:boardID/thread/:threadID', getThread);

module.exports = router
