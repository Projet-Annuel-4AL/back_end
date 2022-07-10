import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { PostsController } from './posts.controller';
import { TextsModule } from './post-body/texts/texts.module';
import { CodesModule } from './post-body/codes/codes.module';
import { UsersModule } from '../users/users.module';
import { LikesModule } from '../likes/likes.module';
import { RemarksModule } from '../remarks/remarks.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    TextsModule,
    CodesModule,
    UsersModule,
    LikesModule,
    RemarksModule,
  ],
  providers: [PostsService],
  exports: [PostsService],
  controllers: [PostsController],
})
export class PostsModule {}
