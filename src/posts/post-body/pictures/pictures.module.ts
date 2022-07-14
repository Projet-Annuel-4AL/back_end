import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PicturesService } from './pictures.service';
import { Picture } from './picture.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([Picture]), ConfigModule],
  providers: [PicturesService],
  exports: [PicturesService],
})
export class PicturesModule {}
