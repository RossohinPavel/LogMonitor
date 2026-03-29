import { LogsService } from "./logs.service";
import type { IncomingLogDto, LogStatDto } from "./logs.types";
import { TypedBody, TypedParam, TypedRoute } from "@nestia/core";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";


@ApiTags("Resources")
@Controller("/res")
export class LogsController {

  constructor(private readonly service: LogsService) {}

  @TypedRoute.Post(":slug/logs")
  create(@TypedParam("slug") slug: string, @TypedBody() body: IncomingLogDto) {
    return this.service.create(slug, body);
  }

  @TypedRoute.Get(":slug/logs")
  findAll(@TypedParam("slug") slug: string) {
    return this.service.findAll(slug);
  }

  @TypedRoute.Get(":slug/logs/:id")
  findOne(@TypedParam("slug") slug: string, @TypedParam("id") id: number) {
    return this.service.findOne(slug, id);
  }

  @TypedRoute.Get(":slug/stat/logs")
  getLogsStat(@TypedParam("slug") slug: string): LogStatDto {
    return this.service.getLogsStat(slug);
  }

}
