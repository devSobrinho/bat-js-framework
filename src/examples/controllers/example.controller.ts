import { Controller } from "@Common/decorators/controller.decorator";
import { Get } from "@Common/decorators/get.decorator";
import { Post } from "@Common/decorators/post.decorator";
import { Req } from "@Common/decorators/req.decorator";
import { Res } from "@Common/decorators/res.decorator";
import { Request, Response } from "express";

@Controller("/example")
export class ExampleController {
  @Get("a/:id")
  getA() {
    return { message: "Hello World" };
  }

  @Post("b")
  getB(@Res() res: Response, @Req() req: Request) {
    res.json({ data: "ExampleController getB" });
  }
}
