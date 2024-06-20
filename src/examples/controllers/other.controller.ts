import { Body } from "@/common/decorators/body.decorator";
import { Controller } from "@/common/decorators/controller.decorator";
import { Delete } from "@/common/decorators/delete.decorator";
import { Get } from "@/common/decorators/get.decorator";
import { Param } from "@/common/decorators/param.decorator";
import { Patch } from "@/common/decorators/patch.decorator";
import { Post } from "@/common/decorators/post.decorator";
import { Put } from "@/common/decorators/put.decorator";
import { Query } from "@/common/decorators/query.decorator";
import { Req } from "@/common/decorators/req.decorator";
import { Res } from "@/common/decorators/res.decorator";
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
