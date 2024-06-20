import { Controller } from "@/common/decorators/controller.decorator";
import { Delete } from "@/common/decorators/delete.decorator";
import { Get } from "@/common/decorators/get.decorator";
import { Post } from "@/common/decorators/post.decorator";
import { Query } from "@/common/decorators/query.decorator";
import { Req } from "@/common/decorators/req.decorator";
import { Res } from "@/common/decorators/res.decorator";
import { ExampleService } from "@/examples/services/example.service";
import { Request, Response } from "express";

@Controller("/example")
export class ExampleController {
  constructor(public exampleService: ExampleService) {}

  @Get("a/:id")
  getA(@Req() res: Response, @Query() query: any, req: Request) {
    return this.exampleService.getA(query);
  }

  @Post("b")
  getB(@Res() res: Response, @Req() req: Request) {
    this.getB(res, req);
  }

  getBas(...args: any[]) {
    // console.log(args[0], args[1]);
  }

  @Delete("c")
  deleteC(@Res() res: Response, @Req() req: Request) {
    return this.exampleService.deleteC(res, req);
  }
}
