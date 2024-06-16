import { Controller } from "@Common/decorators/controller.decorator";
import { Get } from "@Common/decorators/get.decorator";
import { Req } from "@Common/decorators/req.decorator";
import { Res } from "@Common/decorators/res.decorator";
import { Request, Response } from "express";

@Controller("/other")
export class OtherController {
  @Get("c/:id")
  getC() {
    return "Hello World";
  }

  @Get("d")
  getD(@Req() req: Request, @Res() res: Response) {
    res.json({ data: "OtherController getD" });
  }
}
