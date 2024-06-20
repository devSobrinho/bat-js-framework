import "reflect-metadata";
import "tsconfig-paths/register";
import express from "express";
import dotenv from "dotenv";
import { ExpressLoader } from "@/loaders/express.loader";
import Debug from "debug";

const debug = Debug("app:server");
dotenv.config();

export const app = express();

ExpressLoader.init();

app.listen(process.env.APP_PORT, () => {
  debug("Server is running on port " + process.env.APP_PORT);
});
