import express from "express";
import cors from 'cors';
import { postUsers } from "./controllers/users.js";

const app = express();

app.use(cors());
app.use(express.json());

app.post('/users', postUsers);

app.listen(4000);
