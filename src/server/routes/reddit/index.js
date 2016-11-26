import Express from 'express'

import getBoardlist from './getBoardlist'

const router = Express.Router();

router.get('/', () => {throw new Error('Reddit api root')});
router.get('/boards', getBoardlist);
// router.get('/:boardID', getBoard);
// router.get('/:boardID/archive', getArchive);
// router.get('/:boardID/:threadID', getThread);

module.exports = router