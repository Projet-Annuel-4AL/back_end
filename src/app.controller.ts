import { Controller, Request, Get, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth-guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth-guard';
import { CompilerService } from './compiler/compiler.service';
import { Language } from './run-code/enum/language';
import { ExecutionScriptGenerateManagerService } from './run-code/execution-script-generate-manager/execution-script-generate-manager.service';
import { FileManagerService } from './run-code/file-manager/file-manager.service';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private compileService: CompilerService,
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

  @UseGuards(JwtAuthGuard)
  @Post('compile')
  compile(@Request() req) {
    return this.compileService.compile(
      req.body.code,
      req.body.language,
      req.body.input,
    );
  }

  @Get('script')
  async script() {
    const language: Language = Language.Java;
    ExecutionScriptGenerateManagerService.generateExecutionScript(language);
  }

  @Post('main-class')
  async mainClass(@Request() req) {
    const language: Language = Language.Java;
    const path: string =
      FileManagerService.getFolderName(language) +
      FileManagerService.getFileName(language);
    FileManagerService.createFile(path, req.body.code);
  }
}
