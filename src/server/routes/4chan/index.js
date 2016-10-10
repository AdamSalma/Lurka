import Express from 'express'

import getBoard from './getBoard'
import getBoardlist from './getBoardlist'
import getThread from './getThread'

console.log("4chan found");
const router = Express.Router();

router.get('/', () => console.log('Hi mum'));
router.get('/boards', getBoardlist);
router.get('/:boardID', getBoard);
router.get('/:boardID/:threadID', getThread);

module.exports = router