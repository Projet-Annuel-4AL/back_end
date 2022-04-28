import { Module } from '@nestjs/common';
import { CodeRunnerService } from './code-runner.service';
import { DockerManagerModule } from './docker-manager/docker-manager.module';
import { FileManagerModule } from './file-manager/file-manager.module';
import { ExecutionScriptGenerateManagerModule } from './execution-script-generate-manager/execution-script-generate-manager.module';

@Module({
  imports: [
    DockerManagerModule,
    FileManagerModule,
    ExecutionScriptGenerateManagerModule,
  ],
  providers: [CodeRunnerService],
  exports: [CodeRunnerService],
})
export class CodeRunnerModule {}
