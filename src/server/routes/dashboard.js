import express from "express";
import {
	getDashboard
} from './dashboard/';

const router = express.Router();

router.get('/', getDashboard)

module.exports = router