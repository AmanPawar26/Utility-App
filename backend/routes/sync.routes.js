import express from 'express';
import { loadDataController, saveDataController } from '../controllers/sync.controllers.js';
import db from '../db/db.js';

const router = express.Router();

router.get('/load', loadDataController);
router.post('/save', saveDataController);

export default router;
