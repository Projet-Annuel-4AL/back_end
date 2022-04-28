import { Controller, Request, Get, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth-guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth-guard';
import { CodeRunnerService } from './code-runner/code-runner.service';

@Controller()
export class AppController {
  constructor(
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

  @Get()
  findAll(): string {
    return 'This action returns home';
  }
}
