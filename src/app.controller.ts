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
import { JwtAuthGuard } from './auth/jwt-auth-guard';
import { CodeRunnerService } from './code-runner/code-runner.service';
import { PostsService } from './posts/posts.service';
import { CreatePostDto } from './posts/create-post.dto';
import { UsersService } from './users/users.service';
import { CreateUserDto } from './users/create-user.dto';

@Controller()
export class AppController {
  constructor(
    private postsService: PostsService,
    private usersService: UsersService,
    private authService: AuthService,
    private codeRunner: CodeRunnerService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('compiler')
  async compiler(@Request() req) {
    return this.codeRunner.runCode(req.body.code, req.body.language);
  }

  @Get('posts')
  findAllPost() {
    console.log(this.postsService.getAll());
    return this.postsService.getAll();
  }

  @Post('posts')
  createPost(@Body() createPost: CreatePostDto) {
    console.log(createPost);
    return this.postsService.createPost(createPost);
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

  @Get('usersByMail/:mail')
  async getUserByMail(@Param('mail') mail) {
    return this.usersService.findByMail(mail);
  }
}
