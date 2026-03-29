import { DrizzleService } from "./drizzle.service";
import { Test, TestingModule } from "@nestjs/testing";


describe("DrizzleService", () => {
  let service: DrizzleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DrizzleService],
    }).compile();

    service = module.get<DrizzleService>(DrizzleService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
