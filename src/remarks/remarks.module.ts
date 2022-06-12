import { Module } from '@nestjs/common';
import { RemarksService } from './remarks.service';

@Module({
  imports: [RemarksModule],

  providers: [RemarksService],
})
export class RemarksModule {}
