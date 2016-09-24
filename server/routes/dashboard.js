import express from "express";
import {getDashboard} from './dashboard/';

// console.log("main dashboard file =>", getDashboard, typeof getDashboard);

const router = express.Router();


router.get('/', getDashboard)

module.exports = router