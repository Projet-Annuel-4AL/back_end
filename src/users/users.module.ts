import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '../posts/post.entity';
import { User } from './user.entity';
import { PostsService } from '../posts/posts.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post, User])],
  providers: [UsersService, PostsService],
  exports: [UsersService],
})
export class UsersModule {}
