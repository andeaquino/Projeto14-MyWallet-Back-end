import { Request, Response, NextFunction } from "express";
import http from "../enums/http.status";

import InvalidDataError from "../errors/InvalidData";
import ConflictError from "../errors/ConflictError";
import UnauthorizedError from "../errors/Unauthorized";
import NotFoundError from "../errors/NotFoundError";

export default function errorHandlingMiddleware(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error(err);

  if (err instanceof InvalidDataError) {
    return res.status(http.UNPROCESSABLE_ENTITY).send({
      message: err.message,
    });
  }

  if (err instanceof ConflictError) {
    return res.status(http.CONFLICT).send({
      message: err.message,
    });
  }

  if (err instanceof UnauthorizedError) {
    return res.status(http.UNAUTHORIZED).send({
      message: err.message,
    });
  }
  
  if (err instanceof NotFoundError) {
    return res.status(http.NOT_FOUND).send({
      message: err.message,
    });
  }

  res.status(http.INTERNAL_SERVER_ERROR).send({
    message: "Internal Server Error!",
  });
}
