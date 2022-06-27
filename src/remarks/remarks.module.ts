import { Module } from '@nestjs/common';
import { RemarksService } from './remarks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Remark } from './remark.entity';
import { PostsModule } from '../posts/posts.module';

@Module({
  imports: [TypeOrmModule.forFeature([Remark]), PostsModule],
  providers: [RemarksService],
  exports: [RemarksService],
})
export class RemarksModule {}
