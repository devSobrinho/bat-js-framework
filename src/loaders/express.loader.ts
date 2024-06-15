import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { rateLimitConfig } from "../configs/rate-limit.config";
import { HttpException } from "../common/exceptions/http.exception";
import { app } from "../app";
import { ExampleController } from "../controllers/example.controller";
import { registerRoutes } from "./register-routes.loader";
import { OtherController } from "../controllers/other.controller";

export class ExpressLoader {
  public static async init(): Promise<void> {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());
    app.use(helmet());
    app.use(morgan("dev"));
    app.use(rateLimitConfig);

    // ExampleController is a class that contains routes
    new ExampleController();
    new OtherController();

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
