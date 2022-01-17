import "./setup";

import express from "express";
import cors from "cors";
import "reflect-metadata";

import connectDatabase from "./database";

import userRouter from "./routers/userRouter";
import entryRouter from './routers/entryRouter'

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", userRouter);
app.use("/entries", entryRouter);

export async function init () {
  await connectDatabase();
}

export default app;