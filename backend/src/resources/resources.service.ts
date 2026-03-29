import type { CreateResourceDto } from "./resources.types";
import { InsertResource } from "../drizzle/drizzle.schema";
import { DrizzleService } from "../drizzle/drizzle.service";
import { BadRequestException, Injectable } from "@nestjs/common";


@Injectable()
export class ResourcesService {

  constructor(private readonly orm: DrizzleService) {}

  static toCebab(str: string) {
    return str.toLowerCase().split(" ").join("-");
  }

  async create(body: CreateResourceDto) {
    try {
      const newRes: InsertResource = { ...body, slug: ResourcesService.toCebab(body.name) };
      const result = await this.orm.createResource(newRes);
      return result[0];
    } catch (e) {
      console.error(e);
      throw new BadRequestException(e);
    }
  }

  async findAll() {
    try {
      return await this.orm.getResources();
    } catch (e) {
      console.error(e);
      throw new BadRequestException(e);
    }
  }

  async findOne(slug: string) {
    try {
      const result = await this.orm.getResource(slug);
      return result[0];
    } catch (e) {
      console.error(e);
      throw new BadRequestException(e);
    }
  }

  update(name: string) {
    return `This action updates a #${name} resource`;
  }

  async remove(slug: string) {
    try { 
      await this.orm.deleteResource(slug);
    } catch (e) {
      console.error(e);
      throw new BadRequestException(e);
    }
  }

}