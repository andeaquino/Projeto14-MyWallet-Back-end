import faker from "faker";

const generateEntryBody = (entry) => {
  return {
    description: entry?.description || faker.lorem.words(),
    value: entry?.value || faker.datatype.float({ precision: 0.2 }),
  };
};

export { generateEntryBody };
