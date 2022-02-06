import Entry from '../entities/Entry';

async function createEntry(userId: number, description: string, value: number, category: string) {
  const entry = await Entry.createNew(userId, description, value, category);
  return entry;
}

async function findUserEntries(userId: number) {
  const entries = await Entry.findEntries(userId);
  const total = await Entry.findEntriesSum(userId);
  return { entries, total };
}

export { createEntry, findUserEntries };
