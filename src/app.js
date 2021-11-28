import express from "express";
import cors from "cors";
import auth from "./middleware/auth.js";
import * as userController from "./controllers/userController.js";
import * as entriesController from "./controllers/entriesController.js";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/sign-up", userController.signUp);

app.post("/sign-in", userController.signIn);

app.get("/entries", auth, entriesController.getEntries);
app.post("/entries", auth, entriesController.postEntry);

export default app;
