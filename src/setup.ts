import dotenv from "dotenv";

const path = process.env.NODE_ENV === "production" ? ".env" : ".env.test";

dotenv.config({ path });
