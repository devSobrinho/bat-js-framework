import { Injectable } from "@Common/decorators/injectable.decorator";
import { Request, Response } from "express";

@Injectable()
export class ExampleService {
  getA(query: any) {
    return { message: "Hello World", query };
  }

  getB(res: Response, req: Request) {
    res.json({ data: "ExampleService getB" });
  }

  deleteC(res: Response, req: Request) {
    return "ExampleService deleteC";
  }
}
