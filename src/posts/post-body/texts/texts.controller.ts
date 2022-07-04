import { Body, Controller, Post } from '@nestjs/common';
import { CreateTextDto } from './create-text.dto';
import { TextsService } from './texts.service';

@Controller('texts')
export class TextsController {
  constructor(private textService: TextsService) {}

  @Post()
  createText(@Body() createText: CreateTextDto) {
    return this.textService.createText(createText);
  }
}
