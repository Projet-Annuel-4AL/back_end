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

@Controller('api/')
export class AppController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
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
}
