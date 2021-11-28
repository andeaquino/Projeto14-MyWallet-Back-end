import * as entriesRepository from "../repositories/entriesRepository.js";
import { entrySchema } from "../schemas/entriesSchema.js";

const getEntries = async (req, res) => {
  try {
    const entries = await entriesRepository.findUserEntries(req.userId);

    const total = await entriesRepository.getSumEntries(req.userId);

    res.send({ entries, total });
  } catch {
    res.sendStatus(500);
  }
};

const postEntry = async (req, res) => {
  const { description, value } = req.body;

  if (entrySchema.validate({ description, value }).error || value === 0)
    return res.sendStatus(403);

  try {
    await entriesRepository.createEntry(req.userId, description, value);

    return res.sendStatus(201);
  } catch {
    res.sendStatus(500);
  }
};

export { getEntries, postEntry };
