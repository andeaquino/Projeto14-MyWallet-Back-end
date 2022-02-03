import "./setup";

import express from "express";
import cors from "cors";
import "reflect-metadata";

import connectDatabase from "./database";

import userRouter from "./routers/userRouter";
import entryRouter from './routers/entryRouter';
import categoryRouter from "./routers/categoryRouter"

import authenticationMiddleware from "./middleware/tokenValidationMiddleware";
import errorHandlingMiddleware from "./middleware/errorHandlingMiddleware";

const app = express();
app.use(cors());
app.use(express.json());

app.use("", userRouter);
app.use("/entry", authenticationMiddleware, entryRouter);
app.use("/category", authenticationMiddleware, categoryRouter);

app.use(errorHandlingMiddleware);

export async function init () {
  await connectDatabase();
}

export default app;