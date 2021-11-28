import express from "express";
import cors from "cors";
import { signUp, signIn } from "./controllers/users.js";
import { getEntries, postEntry } from "./controllers/entries.js";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/sign-up", signUp);

app.post("/sign-in", signIn);

app.get("/entries", getEntries);
app.post("/entries", postEntry);

export default app;
