import { Request, Response } from "express";
import { getRepository } from "typeorm";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

import User from "../entities/User";

export async function getUsers () {
  const users = await getRepository(User).find({
    select: ["id", "email"]
  });
  
  return users;
}

async function registerUser(user: User) {
  const existingUser = await getRepository(User).find({ email: user.email });

  if (existingUser.length !== 0) return false;

  user.password = bcrypt.hashSync(user.password, 12);
  await getRepository(User).insert(user);

  return true;
}

async function authenticate(user: User) {
  const existingUser = await getRepository(User).findOne({ email: user.email });

  if (!existingUser || !bcrypt.compareSync(existingUser.password, user.password)) {
    return false;
  }

  const token = jwt.sign({
    userId: existingUser.id,
  }, process.env.JWT_SECRET);

  return { token };
}

export { registerUser, authenticate };