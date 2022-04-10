import { Test, TestingModule } from '@nestjs/testing';
import { MainClassGenerateManagerService } from './main-class-generate-manager.service';

describe('MainClassGenerateManagerService', () => {
  let service: MainClassGenerateManagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MainClassGenerateManagerService],
    }).compile();

    service = module.get<MainClassGenerateManagerService>(
      MainClassGenerateManagerService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
