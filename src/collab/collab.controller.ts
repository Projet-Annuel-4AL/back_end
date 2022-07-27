import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';
import { CollabService } from './collab.service';
import { CreateCollabDto } from './dto/create-collab.dto';

@Controller('api/collabs')
export class CollabController {
  constructor(private collabService: CollabService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createCollab(@Body() createCollab: CreateCollabDto) {
    return this.collabService.createCollab(createCollab);
  }

  @Get('/:groupId')
  async getCollabByGroupId(@Param('groupId') groupId) {
    return this.collabService.getCollabByGroupId(groupId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:groupId')
  async deleteCollabByGroupId(@Param('groupId') groupId) {
    return this.collabService.deleteCollabByGroupId(groupId);
  }
}
