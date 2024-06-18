import { Controller } from "@Common/decorators/controller.decorator";
import { Delete } from "@Common/decorators/delete.decorator";
import { Get } from "@Common/decorators/get.decorator";
import { Inject } from "@Common/decorators/inject.decorator";
import { Post } from "@Common/decorators/post.decorator";
import { Query } from "@Common/decorators/query.decorator";
import { Req } from "@Common/decorators/req.decorator";
import { Res } from "@Common/decorators/res.decorator";
import { ExampleService } from "examples/services/example.service";
import { Request, Response } from "express";

@Controller("/example")
export class ExampleController {
  constructor(
    @Inject(ExampleService)
    public exampleService: ExampleService
  ) {
    console.log("ExampleController constructor", this.exampleService);
  }

  @Get("a/:id")
  getA(@Query() query: any) {
    return { message: "Hello World", query };
  }

  @Post("b")
  getB(@Res() res: Response, @Req() req: Request) {
    this.getB(res, req);
  }

  getBas(...args: any[]) {
    console.log(args[0], args[1]);
  }

  @Delete("c")
  deleteC(@Res() res: Response, @Req() req: Request) {
    return this.exampleService.deleteC(res, req);
  }
}
