import { Request, Response } from "express";
import http from "../enums/http.status";

import * as service from "../services/userService";
import { signUpSchema, signInSchema } from "../schemas/usersSchemas";
import InvalidDataError from "../errors/InvalidData";

export async function signUp(req: Request, res: Response) {
  const isBodyInvalid = signUpSchema.validate(req.body).error
  if (isBodyInvalid) {
    throw new InvalidDataError("oi", ["email"]);
  }

  const user = await service.registerUser(req.body.name, req.body.email, req.body.password);
  res.status(http.CREATED).send(user);
}

export async function signIn(req: Request, res: Response) {
  const isBodyInvalid = signInSchema.validate(req.body).error
  if (isBodyInvalid) {
    throw new InvalidDataError("oi", ["email"]);
  }

  const userData = await service.authenticate(req.body.email, req.body.password);
  res.send(userData);
}
