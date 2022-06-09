import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PicturesService } from './pictures.service';
import { Picture } from './picture.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Picture])],
  providers: [PicturesService],
  exports: [PicturesService],
})
export class PicturesModule {}
