import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as userRepository from "../repositories/userRepository.js";

async function authenticate(email, password) {
  const user = await userRepository.findByEmail(email);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return null;
  }

  const token = jwt.sign(
    {
      id: user.id,
    },
    process.env.JWT_SECRET
  );

  return token;
}

async function registerUser(name, email, password) {
  const existingUserWithGivenEmail = await userRepository.findByEmail(email);

  if (existingUserWithGivenEmail) {
    return null;
  }

  const hashedPassword = bcrypt.hashSync(password, 12);

  const user = await userRepository.createUser(name, email, hashedPassword);

  return user;
}

export { authenticate, registerUser };
