import { Module } from '@nestjs/common';
import { RemarksService } from './remarks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Remark } from './remark.entity';
import { UsersModule } from '../users/users.module';
import { RemarksController } from './remarks.controller';
import { Post } from '../posts/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Remark, Post]), UsersModule],
  providers: [RemarksService],
  exports: [RemarksService],
  controllers: [RemarksController],
})
export class RemarksModule {}
