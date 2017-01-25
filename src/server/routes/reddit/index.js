import Express from 'express'

import getSubreddits from './getSubreddits'
import getSubredditsSearch from './getSubredditsSearch'
import getBoard from './getBoard'

const router = Express.Router();

router.get('/', (req,res,next) => next(new Error("No subroute: '/api/reddit'")));
router.get('/boards', getSubreddits);
router.get('/boards/search', getSubredditsSearch);
router.get('/board/:boardID', getBoard);
// router.get('/board/:boardID/archive', getArchive);
// router.get('/board/:boardID/thread/:threadID', getThread);

module.exports = router
