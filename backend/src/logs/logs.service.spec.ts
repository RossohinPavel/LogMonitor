import { LogsService } from "./logs.service";
import { Test, TestingModule } from "@nestjs/testing";


describe("LogsHandlerService", () => {
  let service: LogsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LogsService],
    }).compile();

    service = module.get<LogsService>(LogsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
