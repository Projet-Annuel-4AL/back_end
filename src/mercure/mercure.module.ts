import { Module } from '@nestjs/common';
import { MercureService } from './mercure.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [MercureService],
  exports: [MercureService],
})
export class MercureModule {}
