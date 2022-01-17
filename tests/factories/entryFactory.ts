import faker from 'faker';

interface EntryBody {
    description?: string;
    value?: number;
}

function generateEntryBody (entry?: EntryBody) {
  return {
    description: entry?.description || faker.lorem.words(),
    value: entry?.value || faker.datatype.float({ precision: 0.2 }),
  };
};

export { generateEntryBody };