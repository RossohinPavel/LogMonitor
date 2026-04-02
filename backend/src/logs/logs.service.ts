import { IncomingLogDto } from "./logs.types";
import { DrizzleService } from "../drizzle/drizzle.service";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";


@Injectable()
export class LogsService {

  constructor(private readonly orm: DrizzleService) {}

  create(slug: string, log: IncomingLogDto) {
    try {
      const content = JSON.stringify(log.content);
      const [newLog] = this.orm.createLog(slug, log.type, content);
      if (!newLog) {
        throw new BadRequestException(`Something wrong. Probably resource ${slug} not find.`);
      }
    } catch (e) {
      if (e instanceof BadRequestException) {
        throw e;
      }
      console.error(e);
    }
  }

  getLogsStat(slug: string) {
    const result = this.orm.getLogsStat(slug);
    if (!result?.length) {
      throw new NotFoundException(`Resource ${slug} not found.`);
    }
    console.log(result);
    return { resource: slug, time: new Date(), result };
  }

  findAll(name: string) {
    console.info(name);
  }

  findOne(name: string, id: number) {
    console.info(name, id);
  }

}
