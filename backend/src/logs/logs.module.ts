import { LogsController } from "./logs.controller";
import { LogsService } from "./logs.service";
import { Module } from "@nestjs/common";


@Module({
  controllers: [LogsController],
  providers: [LogsService],
})
export class LogsModule {}
