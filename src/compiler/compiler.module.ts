import { Module } from '@nestjs/common';
import { CompilerService } from './compiler.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [CompilerService],
  exports: [CompilerService],
})
export class CompilerModule {}
