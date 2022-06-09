import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Text } from './text.entity';
import { TextsService } from './texts.service';

@Module({
  imports: [TypeOrmModule.forFeature([Text])],
  providers: [TextsService],
  exports: [TextsService],
})
export class TextsModule {}
