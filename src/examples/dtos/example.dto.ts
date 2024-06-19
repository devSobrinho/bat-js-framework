import { IsNumber } from "@Common/decorators/validations/is-number.decorator";
import { IsString } from "@Common/decorators/validations/is-string.decorator";

class ExampleDTO {
  @IsString()
  name?: string;
  @IsNumber()
  age?: number;
}
