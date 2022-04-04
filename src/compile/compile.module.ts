import { Module } from '@nestjs/common';
import { CompileService } from './compile.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [CompileService],
  exports: [CompileService],
})
export class CompileModule {}
