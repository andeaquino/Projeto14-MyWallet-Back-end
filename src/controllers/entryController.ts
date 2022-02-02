import { Response } from "express";

import UserInfoRequest from "../interfaces/userRequest";
import * as entryService from "../services/entryService";
import { entrySchema } from "../schemas/entriesSchema";

async function getEntries(req: UserInfoRequest, res: Response) {
  try {
		const entries = await entryService.findUserEntries(req.userId);

		const total = await entryService.findEntriesSum(req.userId);

    return res.send({ entries, total });
  } catch  (err) {
    console.error(err);
    return res.sendStatus(500);
  }
    
}

async function postEntry(req: UserInfoRequest, res: Response) {
	const { description, value } = req.body;
	const isBodyInvalid = entrySchema.validate(req.body).error;
  if (isBodyInvalid || value === 0) return res.sendStatus(403);

	const entry = { userId: req.userId, description, value };
	try {
    await entryService.createEntry(entry);

    return res.sendStatus(201);
  } catch  (err) {
    console.error(err);
    return res.sendStatus(500);
  }
    
}

export { getEntries, postEntry };