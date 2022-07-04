import { Body, Controller, Post } from '@nestjs/common';
import { CreateCodeDto } from './create-code.dto';
import { CodesService } from './codes.service';

@Controller('codes')
export class CodesController {
  constructor(private codeService: CodesService) {}

  @Post()
  createCode(@Body() createCode: CreateCodeDto) {
    return this.codeService.createCode(createCode);
  }
}
