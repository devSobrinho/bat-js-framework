import { Body } from "@Common/decorators/body.decorator";
import { Controller } from "@Common/decorators/controller.decorator";
import { Delete } from "@Common/decorators/delete.decorator";
import { Get } from "@Common/decorators/get.decorator";
import { Param } from "@Common/decorators/param.decorator";
import { Patch } from "@Common/decorators/patch.decorator";
import { Post } from "@Common/decorators/post.decorator";
import { Put } from "@Common/decorators/put.decorator";
import { Query } from "@Common/decorators/query.decorator";
import { Req } from "@Common/decorators/req.decorator";
import { Res } from "@Common/decorators/res.decorator";
import { Request, Response } from "express";

@Controller("/other")
export class OtherController {
  @Get("/")
  get(@Req() req: Request, @Res() res: Response) {
    res.json({ data: "OtherController get" });
  }

  @Get("/:id/:name")
  getId(
    @Param("id") id: string,
    @Param("name") name: string,
    @Param() params: string,
    @Query() query: any,
    @Query("example") example: any
  ) {
    return { data: "OtherController getId", id, name, params, query, example };
  }

  @Post("/")
  post(@Body() body: any, @Body("example") example: any) {
    return { data: "OtherController post", body, example };
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
