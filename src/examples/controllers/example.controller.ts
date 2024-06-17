import { Controller } from "@Common/decorators/controller.decorator";
import { Delete } from "@Common/decorators/delete.decorator";
import { Get } from "@Common/decorators/get.decorator";
import { Post } from "@Common/decorators/post.decorator";
import { Query } from "@Common/decorators/query.decorator";
import { Req } from "@Common/decorators/req.decorator";
import { Res } from "@Common/decorators/res.decorator";
import { Request, Response } from "express";

@Controller("/example")
export class ExampleController {
  @Get("a/:id")
  getA(@Query() query: any) {
    return { message: "Hello World", query };
  }

  @Post("b")
  getB(@Res() res: Response, @Req() req: Request) {
    res.json({ data: "ExampleController getB" });
  }

  @Delete("c")
  deleteC(@Res() res: Response, @Req() req: Request) {
    return "ExampleController deleteC";
  }
}
