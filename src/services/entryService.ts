import Entry from '../entities/Entry';

async function createEntry(userId: number, description: string, value: number, category: string) {
  const entry = await Entry.createNew(userId, description, value, category);
  return entry;
}

async function findUserEntries(userId: number) {
  const entries = await Entry.findFromUser(userId);
  const total = await Entry.findSumFromUser(userId);
  return { entries, total };
}

async function findEntriesSumPerMonth(userId: number) {
  const entries = await Entry.findSumPerMonth(userId);
  return entries;
}

export { createEntry, findUserEntries, findEntriesSumPerMonth };
