import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';
import { CodeRunnerService } from './code-runner.service';

@Controller('api/')
export class CodeRunnerController {
  constructor(private codeRunner: CodeRunnerService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async compiler(@Request() req) {
    return this.codeRunner.runCode(req.body.code, req.body.language);
  }
}
