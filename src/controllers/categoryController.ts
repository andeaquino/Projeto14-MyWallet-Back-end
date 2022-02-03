import { NextFunction, Request, Response } from "express";

import * as service from "../services/categoryService";

async function getCategories(req: Request, res: Response, next: NextFunction) {
  try {
		const categories = await service.findCategories();
    return res.send(categories);
  } catch  (err) {
     next(err);
  }  
}

export { getCategories };