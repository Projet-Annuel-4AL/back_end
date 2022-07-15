import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateTextDto } from './dto/create-text.dto';
import { TextsService } from './texts.service';
import { JwtAuthGuard } from '../../../auth/jwt-auth-guard';

@Controller('api/texts')
export class TextsController {
  constructor(private textService: TextsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createText(@Body() createText: CreateTextDto) {
    return this.textService.createText(createText);
  }

  @Get()
  findAllText() {
    return this.textService.getAll();
  }
}
