import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Text } from './text.entity';
import { TextsService } from './texts.service';
import { TextsController } from './texts.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Text])],
  providers: [TextsService],
  exports: [TextsService],
  controllers: [TextsController],
})
export class TextsModule {}
