import express from "express";
import cors from "cors";
import * as userController from "./controllers/userController.js";
import { getEntries, postEntry } from "./controllers/entries.js";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/sign-up", userController.signUp);

app.post("/sign-in", userController.signIn);

app.get("/entries", getEntries);
app.post("/entries", postEntry);

export default app;
