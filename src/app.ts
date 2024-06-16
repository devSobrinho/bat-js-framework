import "tsconfig-paths/register";
import express from "express";
import dotenv from "dotenv";
import { ExpressLoader } from "./loaders/express.loader";

dotenv.config();

export const app = express();

ExpressLoader.init();

app.listen(process.env.APP_PORT, () => {
  console.log("Server is running on port " + process.env.APP_PORT);
});
