import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CodeRunnerModule } from './code-runner/code-runner.module';
import { PostsModule } from './posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { LikesModule } from './likes/likes.module';
import { RemarksModule } from './remarks/remarks.module';
import { TextsModule } from './posts/post-body/texts/texts.module';
import { CodesModule } from './posts/post-body/codes/codes.module';
import { FollowsModule } from './follows/follows.module';
import { GroupsModule } from './groups/groups.module';
import { RelationGroupUserModule } from './relation-group-user/relation-group-user.module';
import { RelationGroupPostModule } from './relation-group-post/relation-group-post.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { APP_FILTER } from '@nestjs/core';
import { ExceptionsLoggerFilter } from './exception/exceptions-logger-filter';

config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: ['dist/**/**.entity{.ts,.js}'],
      synchronize: false,
    }),
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        //...
        ACCESS_TOKEN_SECRET: Joi.string().required(),
        ACCESS_TOKEN_EXPIRATION: Joi.string().required(),
        REFRESH_TOKEN_SECRET: Joi.string().required(),
        REFRESH_TOKEN_EXPIRATION: Joi.string().required(),
        AWS_REGION: Joi.string().required(),
        AWS_ACCESS_KEY_ID: Joi.string().required(),
        AWS_SECRET_ACCESS_KEY: Joi.string().required(),
        AWS_PUBLIC_BUCKET_NAME: Joi.string().required(),
      }),
    }),
    AuthModule,
    UsersModule,
    CodeRunnerModule,
    PostsModule,
    LikesModule,
    RemarksModule,
    TextsModule,
    CodesModule,
    FollowsModule,
    GroupsModule,
    RelationGroupUserModule,
    RelationGroupPostModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: ExceptionsLoggerFilter,
    },
  ],
})
export class AppModule {}
