import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateRemarkDto } from './dto/create-remark.dto';
import { RemarksService } from './remarks.service';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';

@Controller('api/remarks')
export class RemarksController {
  constructor(private remarkService: RemarksService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createRemark(@Body() createRemark: CreateRemarkDto) {
    return this.remarkService.createRemark(createRemark);
  }

  @Get()
  findAllRemarks() {
    return this.remarkService.getAll();
  }

  @Get('/:postId')
  async getRemarksByPostId(@Param('postId') postId) {
    return this.remarkService.findByPostId(postId);
  }

  @Delete('/:remarkId')
  async deleteRemarksById(@Param('remarkId') remarkId) {
    return this.remarkService.deleteRemarksById(remarkId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/posts/:postId')
  async deleteRemarksByPostId(@Param('postId') postId) {
    return this.remarkService.deleteRemarksByPostId(postId);
  }
}
