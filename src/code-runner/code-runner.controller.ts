import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';
import { CodeRunnerService } from './code-runner.service';

@Controller('api/compiler')
export class CodeRunnerController {
  constructor(private codeRunner: CodeRunnerService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async compiler(@Request() req) {
    console.log(req.body);
    return this.codeRunner.runCode(req.body.code, req.body.language);
  }
}
