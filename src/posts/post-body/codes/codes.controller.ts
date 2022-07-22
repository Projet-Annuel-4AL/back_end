import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateCodeDto } from './dto/create-code.dto';
import { CodesService } from './codes.service';
import { JwtAuthGuard } from '../../../auth/jwt-auth-guard';
import { MercureService } from '../../../mercure/mercure.service';
import { Code } from './code.entity';
import { UpdateCollabCodeDto } from './dto/update-collab-code.dto';

@Controller('api/codes')
export class CodesController {
  constructor(
    private codeService: CodesService,
    private mercureService: MercureService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createCode(@Body() createCode: CreateCodeDto) {
    return this.codeService.createCode(createCode);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('collab/:codeId')
  async updateCode(
    @Param('codeId') codeId: number,
    @Body() collabCodeUpdate: UpdateCollabCodeDto,
  ) {
    const codeUpdate = { content: collabCodeUpdate.content };
    const code: Code = await this.codeService.updateCode(codeId, codeUpdate);
    console.log(code);
    if (code) {
      try {
        console.log('test');
        this.mercureService.sendCollabUpdate(collabCodeUpdate.idGroup);
      } catch (e) {
        console.log(e);
      }
      return code;
    }
  }

  @Get()
  findAllCode() {
    return this.codeService.getAll();
  }

  @Get('collab')
  testMercure() {
    try {
      this.mercureService.sendCollabUpdate(2);
    } catch (e) {
      console.log(e);
    }
  }

  @Get(':codeId')
  findByCodeId(@Param('codeId') codeId: number) {
    return this.codeService.findByCodeId(codeId);
  }
}
