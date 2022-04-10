import { Controller, Request, Get, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth-guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth-guard';
import { CompileService } from './compile/compile.service';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private compileService: CompileService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Get('/')
  home() {
    return 'hello';
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('compile')
  compile(@Request() req) {
    return this.compileService.compile(
      req.body.code,
      req.body.language,
      req.body.input,
    );
  }
}
