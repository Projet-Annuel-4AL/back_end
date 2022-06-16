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
    AuthModule,
    UsersModule,
    CodeRunnerModule,
    PostsModule,
    LikesModule,
    RemarksModule,
    TextsModule,
    CodesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
