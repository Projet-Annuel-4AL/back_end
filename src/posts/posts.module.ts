import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { User } from '../users/user.entity';
import { PostsController } from './posts.controller';
import { Text } from './post-body/texts/text.entity';
import { TextsModule } from './post-body/texts/texts.module';
import { CodesModule } from './post-body/codes/codes.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, User, Text]),
    TextsModule,
    CodesModule,
    UsersModule,
  ],
  providers: [PostsService],
  exports: [PostsService],
  controllers: [PostsController],
})
export class PostsModule {}
