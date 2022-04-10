import { Test, TestingModule } from '@nestjs/testing';
import { DockerManagerService } from './docker-manager.service';

describe('DockerManagerService', () => {
  let service: DockerManagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DockerManagerService],
    }).compile();

    service = module.get<DockerManagerService>(DockerManagerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
