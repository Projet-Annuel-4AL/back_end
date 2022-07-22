import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from './like.entity';
import { UsersModule } from '../users/users.module';
import { LikesController } from './likes.controller';
import { Post } from '../posts/post.entity';
import { MercureModule } from '../mercure/mercure.module';

@Module({
  imports: [TypeOrmModule.forFeature([Like, Post]), UsersModule, MercureModule],
  providers: [LikesService],
  exports: [LikesService],
  controllers: [LikesController],
})
export class LikesModule {}
