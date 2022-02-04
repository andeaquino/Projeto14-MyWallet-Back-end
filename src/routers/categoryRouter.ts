import express from 'express';
import * as controller from "../controllers/categoryController";

const router = express.Router();

router.get('/', controller.getCategories);
router.get('/entries', controller.getCategoryEntries);

export default router;