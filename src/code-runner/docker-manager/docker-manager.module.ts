import { Module } from '@nestjs/common';
import { DockerManagerService } from './docker-manager.service';

@Module({
  providers: [DockerManagerService],
  exports: [DockerManagerService],
})
export class DockerManagerModule {}
