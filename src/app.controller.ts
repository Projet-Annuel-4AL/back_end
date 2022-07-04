import {
  Controller,
  Request,
  Get,
  Post,
  UseGuards,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth-guard';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';
import { CreateUserDto } from './users/create-user.dto';
import { CreateRemarkDto } from './remarks/create-remark.dto';
import { RemarksService } from './remarks/remarks.service';
import { LikesService } from './likes/likes.service';
import { CreateLikeDto } from './likes/create-like.dto';
import { CreateTextDto } from './posts/post-body/texts/create-text.dto';
import { TextsService } from './posts/post-body/texts/texts.service';
import { CreateCodeDto } from './posts/post-body/codes/create-code.dto';
import { CodesService } from './posts/post-body/codes/codes.service';

@Controller('api/')
export class AppController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private remarkService: RemarksService,
    private likeService: LikesService,
    private textService: TextsService,
    private codeService: CodesService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('users')
  findAllUser() {
    return this.usersService.getAll();
  }

  @Post('users')
  createUser(@Body() createUser: CreateUserDto) {
    return this.usersService.createUser(createUser);
  }

  @Get('users/:mail')
  async getUserByMail(@Param('mail') mail) {
    return this.usersService.findByMail(mail);
  }

  @Get('users/id/:userId')
  async getUserById(@Param('userId') userId) {
    return this.usersService.findByUserId(userId);
  }

  @Post('remarks')
  createRemark(@Body() createRemark: CreateRemarkDto) {
    return this.remarkService.createRemark(createRemark);
  }

  @Get('remarks')
  findAllRemarks() {
    return this.remarkService.getAll();
  }

  @Get('remarks/:postId')
  async getRemarksByPostId(@Param('postId') postId) {
    return this.remarkService.findByPostId(postId);
  }

  @Delete('remarks/:remarkId')
  async deleteRemarksById(@Param('remarkId') remarkId) {
    return this.remarkService.deleteRemarksById(remarkId);
  }

  @Post('likes')
  createLike(@Body() createLike: CreateLikeDto) {
    return this.likeService.createLike(createLike);
  }

  @Get('likes')
  findAllLikes(
    @Query('idUser') idUser?: number,
    @Query('postId') idPost?: number,
  ) {
    if (this.isNotEmptyParam(idUser) && this.isNotEmptyParam(idPost)) {
      return this.likeService.findLikeByUserIdAndPostId(idUser, idPost);
    }
    return this.likeService.getAll();
  }

  isNotEmptyParam(param: number): boolean {
    return param != null;
  }

  @Get('likes/:userId')
  async getLikesByUserId(@Param('userId') userId) {
    return this.likeService.findByUserId(userId);
  }

  @Get('likes/:postId')
  async getLikesByPostId(@Param('postId') postId) {
    return this.likeService.findByPostId(postId);
  }

  @Delete('likes/:likeId')
  async deleteLikesById(@Param('likeId') likeId) {
    return this.likeService.deleteLikesById(likeId);
  }

  @Post('texts')
  createText(@Body() createText: CreateTextDto) {
    return this.textService.createText(createText);
  }

  @Post('codes')
  createCode(@Body() createCode: CreateCodeDto) {
    return this.codeService.createCode(createCode);
  }
}
