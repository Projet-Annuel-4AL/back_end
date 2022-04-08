import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionScriptGenerateManagerService } from './execution-script-generate-manager.service';

describe('ExecutionScriptGenerateManagerService', () => {
  let service: ExecutionScriptGenerateManagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExecutionScriptGenerateManagerService],
    }).compile();

    service = module.get<ExecutionScriptGenerateManagerService>(
      ExecutionScriptGenerateManagerService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
