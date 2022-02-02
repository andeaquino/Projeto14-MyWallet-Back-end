import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

import User from "../entities/User";
import UnauthorizedError from "../errors/Unauthorized";

async function registerUser(name: string, email: string, password: string) {
  const user = await User.createNew(name, email, password);
  return user;
}

async function authenticate(email: string, password: string) {
  const user = await User.findOne({email});

  if (!user || !bcrypt.compareSync(password, user.password)) {
    throw new UnauthorizedError();
  }

  const token = jwt.sign({
    userId: user.id,
  }, process.env.JWT_SECRET);

  return { token, name: user.name };
}

export { registerUser, authenticate };