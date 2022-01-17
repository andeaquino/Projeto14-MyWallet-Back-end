import { getRepository } from "typeorm";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

import User from "../entities/User";

interface UserCreate {
  name?: string;
  email: string;
  password: string;
}

async function registerUser(user: UserCreate) {
  const existingUser = await getRepository(User).find({ email: user.email });

  if (existingUser.length !== 0) return false;

  user.password = bcrypt.hashSync(user.password, 12);
  await getRepository(User).insert(user);

  return true;
}

async function authenticate(user: UserCreate) {
  const userInfo = await getRepository(User).findOne({ email: user.email });
  const isPasswordValid = bcrypt.compareSync(user.password, userInfo.password);

  if (!userInfo || !isPasswordValid) {
    return false;
  }

  const token = jwt.sign({
    userId: userInfo.id,
  }, process.env.JWT_SECRET);

  return { token, name: userInfo.name };
}

export { registerUser, authenticate };