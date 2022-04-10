import { Module } from '@nestjs/common';
import { MainClassGenerateManagerService } from './main-class-generate-manager.service';

@Module({
  providers: [MainClassGenerateManagerService],
  exports: [MainClassGenerateManagerService],
})
export class MainClassGenerateManagerModule {}
