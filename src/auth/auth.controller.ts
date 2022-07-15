import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from './local-auth-guard';
import RequestWithUser from './request-whit-user.interface';
import { AuthService } from './auth.service';
import RegisterDto from './dto/register.dto';
import { UsersService } from '../users/users.service';
import JwtRefreshGuard from './jwt-refresh-guard';
import { JwtAuthGuard } from './jwt-auth-guard';

@Controller('api/auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() request: RequestWithUser) {
    const { user } = request;
    const access_token = await this.authService.getJwtAccessToken(request.user);
    const refresh_token = await this.authService.getJwtRefreshToken(
      request.user,
    );
    await this.usersService.setCurrentRefreshToken(refresh_token, user.id);
    return {
      access_token: access_token,
      refresh_token: refresh_token,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @HttpCode(200)
  async logOut(@Req() request: RequestWithUser) {
    await this.usersService.removeCurrentRefreshToken(request.user.id);
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  async refresh(@Req() request: RequestWithUser) {
    return {
      access_token: await this.authService.getJwtAccessToken(request.user),
    };
  }

  @Post('register')
  register(@Body() registrationData: RegisterDto) {
    return this.authService.register(registrationData);
  }
}
