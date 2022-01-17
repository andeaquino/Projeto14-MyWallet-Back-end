import { Request, Response } from "express";

import * as userService from "../services/userService";
import { signUpSchema, signInSchema } from "../schemas/usersSchemas";

async function signUp(req: Request, res: Response) {
  try {
    const isBodyInvalid = signUpSchema.validate(req.body).error
    if (isBodyInvalid) return res.sendStatus(403);

    const user = await userService.registerUser(req.body);

    if (!user) {
      return res.sendStatus(409);
    }

    return res.sendStatus(201);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
}

async function signIn(req: Request, res: Response) {
  try {
    const isBodyInvalid = signInSchema.validate(req.body).error
    if (isBodyInvalid) return res.sendStatus(403);

    const user = await userService.authenticate(req.body);

    if (user) {
      return res.send(user);
    }
    return res.sendStatus(401);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
}

export { signUp, signIn };