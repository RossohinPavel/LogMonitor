import { ResourcesController } from "./resources.controller";
import { ResourcesService } from "./resources.service";
import { LogsModule } from "../logs/logs.module";
import { Module } from "@nestjs/common";


@Module({
  imports: [LogsModule],
  controllers: [ResourcesController],
  providers: [ResourcesService],
})
export class ResourcesModule {}