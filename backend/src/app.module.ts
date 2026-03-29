import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { getConfig } from "./config";
import { DrizzleModule } from "./drizzle/drizzle.module";
import { ResourcesModule } from "./resources/resources.module";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";


@Module({
  imports: [
    ConfigModule.forRoot({ load: [getConfig], isGlobal: true }),
    DrizzleModule,
    ResourcesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}