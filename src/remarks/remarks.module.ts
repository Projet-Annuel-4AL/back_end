import { Module } from '@nestjs/common';
import { RemarksService } from './remarks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Remark } from './remark.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Remark])],
  providers: [RemarksService],
  exports: [RemarksService],
})
export class RemarksModule {}
