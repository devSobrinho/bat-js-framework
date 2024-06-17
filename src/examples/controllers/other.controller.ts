import { Controller } from "@Common/decorators/controller.decorator";
import { Delete } from "@Common/decorators/delete.decorator";
import { Get } from "@Common/decorators/get.decorator";
import { Patch } from "@Common/decorators/patch.decorator";
import { Post } from "@Common/decorators/post.decorator";
import { Put } from "@Common/decorators/put.decorator";
import { Req } from "@Common/decorators/req.decorator";
import { Res } from "@Common/decorators/res.decorator";
import { Request, Response } from "express";

@Controller("/other")
export class OtherController {
  @Get("/")
  get(@Req() req: Request, @Res() res: Response) {
    res.json({ data: "OtherController get" });
  }

  @Get("/:id")
  getId() {
    return "OtherController getId";
  }

  @Post("/")
  post() {
    return { data: "OtherController post" };
  }

  @Patch()
  patch() {
    return { data: "OtherController patch" };
  }

  @Put()
  put() {
    return { data: "OtherController put" };
  }

  @Delete()
  delete() {
    return { data: "OtherController delete" };
  }

  @Get("a")
  getA(@Req() req: Request, @Res() res: Response) {
    res.json({ data: "OtherController getA" });
  }
}
