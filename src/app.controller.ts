import {
  Controller,
  Request,
  Get,
  Post,
  UseGuards,
  Body,
  Param,
} from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth-guard';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';
import { CreateUserDto } from './users/create-user.dto';
import { CreateRemarkDto } from './remarks/create-remark.dto';
import { RemarksService } from './remarks/remarks.service';
import { LikesService } from './likes/likes.service';
import { CreateLikeDto } from './likes/create-like.dto';

@Controller('api/')
export class AppController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private remarkService: RemarksService,
    private likeService: LikesService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('users')
  findAllUser() {
    console.log(this.usersService.getAll());
    return this.usersService.getAll();
  }

  @Post('users')
  createUser(@Body() createUser: CreateUserDto) {
    console.log(createUser);
    return this.usersService.createUser(createUser);
  }

  @Get('users/:mail')
  async getUserByMail(@Param('mail') mail) {
    return this.usersService.findByMail(mail);
  }

  @Post('remarks')
  createRemark(@Body() createRemark: CreateRemarkDto) {
    console.log(createRemark);
    return this.remarkService.createRemark(createRemark);
  }

  @Get('remarks')
  findAllRemarks() {
    console.log(this.remarkService.getAll());
    return this.remarkService.getAll();
  }

  @Get('remarks/:postId')
  async getRemarksByPostId(@Param('postId') postId) {
    return this.remarkService.findByPostId(postId);
  }

  @Post('likes')
  createLike(@Body() createLike: CreateLikeDto) {
    console.log(createLike);
    return this.likeService.createLike(createLike);
  }

  @Get('likes')
  findAllLikes() {
    console.log(this.likeService.getAll());
    return this.likeService.getAll();
  }

  @Get('likes/:userId')
  async getLikesByUserId(@Param('userId') userId) {
    return this.likeService.findByUserId(userId);
  }

  @Get('likes/:postId')
  async getLikesByPostId(@Param('postId') postId) {
    return this.likeService.findByPostId(postId);
  }
}
