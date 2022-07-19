import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { PicturesModule } from '../posts/post-body/pictures/pictures.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), PicturesModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
