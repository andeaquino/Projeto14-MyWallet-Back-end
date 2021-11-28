import faker from "faker";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import * as userRepository from "../../src/repositories/userRespository.js";

const generateUserBody = (user) => {
  return {
    name: user?.name || faker.name.findName(),
    email: user?.email || faker.internet.email(),
    password: user?.password || faker.internet.password(8),
  };
};

const createUser = async () => {
  const user = generateUserBody();
  const passwordHash = bcrypt.hashSync(user.password, 12);

  const createdUser = await userRepository.createUser(
    user.name,
    user.email,
    passwordHash
  );

  user.id = createdUser.id;

  return user;
};

const createToken = async () => {
  const user = await createUser();

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
  return token;
};

export { createToken, generateUserBody, createUser };
