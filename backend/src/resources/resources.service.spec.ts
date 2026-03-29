import { ResourcesService } from "./resources.service";
import { Test, TestingModule } from "@nestjs/testing";


describe("ResourcesService", () => {
  let service: ResourcesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResourcesService],
    }).compile();

    service = module.get<ResourcesService>(ResourcesService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
