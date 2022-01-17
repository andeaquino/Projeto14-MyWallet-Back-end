import "./setup";

import express from "express";
import cors from "cors";
import "reflect-metadata";

import connectDatabase from "./database";

import userRouter from "./routers/userRouter";
import entryRouter from './routers/entryRouter'
import auth from "./middleware/auth";

const app = express();
app.use(cors());
app.use(express.json());

app.use("", userRouter);
app.use("/entries", auth, entryRouter);

export async function init () {
  await connectDatabase();
}

export default app;