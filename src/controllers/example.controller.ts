import { Get } from "../common/decorators/get.decorator";
import { Request, Response } from "express";
import { Req } from "../common/decorators/req.decorator";
import { Res } from "../common/decorators/res.decorator";
import { Controller } from "../common/decorators/controller.decorator";
import { Post } from "../common/decorators/post.decorator";

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
