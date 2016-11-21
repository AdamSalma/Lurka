import Express from 'express'

import getBoardlist from './getBoardlist'
import getBoard from './getBoard'
import getArchive from './getArchive'
import getThread from './getThread'

const router = Express.Router();

router.get('/', () => console.log('Hi mum'));
router.get('/boards', getBoardlist);
router.get('/:boardID', getBoard);
router.get('/:boardID/archive', getArchive);
router.get('/:boardID/:threadID', getThread);

module.exports = router