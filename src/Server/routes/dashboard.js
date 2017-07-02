import Express from "express";
import {
	getDashboard
} from './dashboard/';

const router = Express.Router();

router.get('/', getDashboard)

export default router