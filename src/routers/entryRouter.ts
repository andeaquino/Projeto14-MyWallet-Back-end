import express from 'express';
import * as entryController from "../controllers/entryController";

const router = express.Router();

router.get('', entryController.getEntries);
router.post('', entryController.postEntry);

export default router;