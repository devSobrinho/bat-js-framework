import { Injectable } from "@/common/decorators/injectable.decorator";
import { ExampleRepository } from "@/examples/repositories/example.repository";
import { Request, Response } from "express";

@Injectable()
export class ExampleService {
  constructor(private readonly exampleRepository: ExampleRepository) {}

  getA(data: any) {
    return this.exampleRepository.get(data);
  }

  getB(res: Response, req: Request) {
    res.json({ data: "ExampleService getB" });
  }

  deleteC(res: Response, req: Request) {
    return "ExampleService deleteC";
  }
}
