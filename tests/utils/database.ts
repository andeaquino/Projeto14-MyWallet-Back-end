import { getRepository } from "typeorm";

import Entry from "../../src/entities/Entry";
import User from "../../src/entities/User";

export async function clearDatabase() {
  await getRepository(Entry).delete({});
  await getRepository(User).delete({});
}