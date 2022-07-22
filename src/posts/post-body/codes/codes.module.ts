import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Code } from './code.entity';
import { CodesService } from './codes.service';
import { CodesController } from './codes.controller';
import { MercureModule } from '../../../mercure/mercure.module';

@Module({
  imports: [TypeOrmModule.forFeature([Code]), MercureModule],
  providers: [CodesService],
  exports: [CodesService],
  controllers: [CodesController],
})
export class CodesModule {}
