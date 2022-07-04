import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from './like.entity';
import { UsersModule } from '../users/users.module';
import { PostsModule } from '../posts/posts.module';
import { LikesController } from './likes.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Like]), UsersModule, PostsModule],
  providers: [LikesService],
  exports: [LikesService],
  controllers: [LikesController],
})
export class LikesModule {}
