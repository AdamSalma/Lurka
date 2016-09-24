import express from 'express';
import {
	getBoardlist, 
	getBoard, 
	getThread
} from './4chan';

console.log(getBoardlist)

const router = express.Router();

router.get('/boards', getBoardlist);
router.get('/:boardID', getBoard);
router.get('/:boardID/:threadID', getThread);

module.exports = router