import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Code } from './code.entity';
import { CodesService } from './codes.service';
import { CodesController } from './codes.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Code])],
  providers: [CodesService],
  exports: [CodesService],
  controllers: [CodesController],
})
export class CodesModule {}
