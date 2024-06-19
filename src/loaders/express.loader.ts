import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";

import { app } from "../app";
import { HttpException } from "../common/exceptions/http.exception";
import { rateLimitConfig } from "../configs/rate-limit.config";
import { registerRoutes } from "./register-routes.loader";

export class ExpressLoader {
  public static async init(): Promise<void> {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());
    app.use(helmet());
    app.use(morgan("dev"));
    app.use(rateLimitConfig);

    registerRoutes(app);

    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      console.error(err.stack);
      if (err instanceof HttpException) {
        return res.status(err.getStatus()).json(err.getResponse());
      }

      res.status(500).json({ error: err.message });
    });
  }
}
