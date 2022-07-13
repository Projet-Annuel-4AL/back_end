import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateCodeDto } from './dto/create-code.dto';
import { CodesService } from './codes.service';
import { JwtAuthGuard } from '../../../auth/jwt-auth-guard';

@Controller('api/codes')
export class CodesController {
  constructor(private codeService: CodesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createCode(@Body() createCode: CreateCodeDto) {
    return this.codeService.createCode(createCode);
  }

  @Get()
  findAllCode() {
    return this.codeService.getAll();
  }
}
