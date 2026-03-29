import { DrizzleService } from "./drizzle.service";
import { Global, Module } from "@nestjs/common";


@Global() // Делает экспорт доступным везде автоматически
@Module({
  providers: [DrizzleService],
  exports: [DrizzleService], // Делимся тем самым единственным экземпляром
})
export class DrizzleModule {}