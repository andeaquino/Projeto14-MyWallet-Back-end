import express from 'express';
import * as controller from "../controllers/categoryController";

const router = express.Router();

router.get('/', controller.getCategories);

export default router;