import { ResourcesService } from "./resources.service";
import type { CreateResourceDto, ResourceDto } from "./resources.types";
import { TypedBody, TypedParam, TypedRoute } from "@nestia/core";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";


@ApiTags("Resources")
@Controller("res")
export class ResourcesController {

  constructor(private readonly service: ResourcesService) {}

  @TypedRoute.Post()
  create(@TypedBody() body: CreateResourceDto): Promise<ResourceDto> {
    return this.service.create(body);
  }

  @TypedRoute.Get()
  findAll(): Promise<ResourceDto[]> {
    return this.service.findAll();
  }

  @TypedRoute.Get(":slug")
  findOne(@TypedParam("slug") slug: string): Promise<ResourceDto> {
    return this.service.findOne(slug);
  }

  @TypedRoute.Patch(":slug")
  update(@TypedParam("slug") name: string) {
    return this.service.update(name);
  }

  @TypedRoute.Delete(":slug")
  remove(@TypedParam("slug") slug: string): Promise<void> {
    return this.service.remove(slug);
  }

}