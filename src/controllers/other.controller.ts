import { Get } from "../common/decorators/get.decorator";
import { Express, Request, Response } from "express";
import { Req } from "../common/decorators/req.decorator";
import { Res } from "../common/decorators/res.decorator";
import { Controller } from "../common/decorators/controller.decorator";

@Controller("/other")
export class OtherController {
  @Get("c/:id")
  getC() {
    return "Hello World";
  }

  @Get("d")
  getD(@Res() res: Response, @Req() req: Request) {
    res.json({ data: "OtherController getD" });
  }
}
