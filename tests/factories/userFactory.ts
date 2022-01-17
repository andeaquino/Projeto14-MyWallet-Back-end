import { getRepository } from "typeorm";
import faker from "faker";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

import User from "../../src/entities/User";

interface UserBody {
  name?: string;
  email?: string;
  password?: string;
}

function generateUserBody (user?: UserBody) {
  return {
    name: user?.name || faker.name.findName(),
    email: user?.email || faker.internet.email(),
    password: user?.password || faker.internet.password(8),
  };
};

async function createUser () {
  const user = generateUserBody();
  const passwordHash = bcrypt.hashSync(user.password, 12);

  const createdUser = getRepository(User).create({
    name: user.name,
    email: user.email,
    password: passwordHash
  });

  await getRepository(User).save(createdUser);

  return {...user, id: createdUser.id};
};

async function createToken () {
  const user = await createUser();

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
  return token;
};

export { createToken, generateUserBody, createUser };