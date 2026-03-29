import { AppService } from "./app.service";
import { TypedRoute } from "@nestia/core";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";


@ApiTags("App")
@Controller()
export class AppController {

  constructor(private readonly service: AppService) {}

  @TypedRoute.Get("ping")
  ping(): string {
    return this.service.getPong();
  }

}
