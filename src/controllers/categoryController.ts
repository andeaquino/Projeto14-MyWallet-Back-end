import { NextFunction, Request, Response } from "express";

import UserInfoRequest from "../interfaces/userRequest";
import * as service from "../services/categoryService";

async function getCategories(req: Request, res: Response, next: NextFunction) {
  try {
		const categories = await service.findCategories();
    return res.send(categories);
  } catch  (err) {
     next(err);
  }  
}

async function getCategoryEntries(req: UserInfoRequest, res: Response, next: NextFunction) {
  try {
		const categoryEntries = await service.findCategoryEntries(req.userId);
    return res.send(categoryEntries);
  } catch  (err) {
     next(err);
  }  
}

export { getCategories, getCategoryEntries };