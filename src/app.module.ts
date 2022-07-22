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
import { APP_FILTER } from '@nestjs/core';
import { ExceptionsLoggerFilter } from './exception/exceptions-logger-filter';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MercureModule } from './mercure/mercure.module';
import { CollabModule } from './collab/collab.module';

config();

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: ['dist/**/**.entity{.ts,.js}'],
        synchronize: false,
      }),
    }),
    ConfigModule.forRoot(),
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
    MercureModule,
    CollabModule,
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
