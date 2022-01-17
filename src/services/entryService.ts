import { getRepository } from "typeorm";

import Entry from '../entities/Entry';

interface EntryCreate {
	userId: number;
	description: string;
	value: number;
}

async function createEntry(entry: EntryCreate) {
  await getRepository(Entry).insert(entry);

  return true;
}

async function findUserEntries(userId: number) {
  const entries = await getRepository(Entry).find({userId});
  
  return entries;
}

async function findEntriesSum(userId: number) {
  const entriesSum = await getRepository(Entry).createQueryBuilder("entries")
    .select("SUM(entries.value)", "sum")
    .where("user_id = :id", { id: userId })
		.getRawOne();;

  return entriesSum.sum;
}

export { createEntry, findUserEntries, findEntriesSum };