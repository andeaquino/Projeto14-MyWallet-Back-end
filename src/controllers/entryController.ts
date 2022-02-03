import { NextFunction, Response } from "express";
import http from "../enums/http.status";

import UserInfoRequest from "../interfaces/userRequest";
import * as service from "../services/entryService";
import { entrySchema } from "../schemas/entriesSchema";
import InvalidDataError from "../errors/InvalidData";

async function getEntries(req: UserInfoRequest, res: Response, next: NextFunction) {
  try {
		const userEntries = await service.findUserEntries(req.userId);
    return res.send(userEntries);
  } catch  (err) {
     next(err);
  }  
}

async function postEntry(req: UserInfoRequest, res: Response, next: NextFunction) {  
  try {
    const { description, value, category } = req.body;
    const isBodyInvalid = entrySchema.validate(req.body).error;
    if (isBodyInvalid || value === 0) {
      throw new InvalidDataError("Entrada inválida!");
    }

    const entry = await service.createEntry(req.userId, description, value, category);
    res.status(http.CREATED).send(entry);
  } catch  (err) {
     next(err);
  }
}

export { getEntries, postEntry };