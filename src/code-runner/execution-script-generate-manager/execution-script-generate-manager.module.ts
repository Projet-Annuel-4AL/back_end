import { Module } from '@nestjs/common';
import { ExecutionScriptGenerateManagerService } from './execution-script-generate-manager.service';

@Module({
  providers: [ExecutionScriptGenerateManagerService],
  exports: [ExecutionScriptGenerateManagerService],
})
export class ExecutionScriptGenerateManagerModule {}
