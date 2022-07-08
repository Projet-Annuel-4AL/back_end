import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GroupsService } from './groups.service';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';
import { CreateGroupDto } from './create-group.dto';

@Controller('groups')
export class GroupsController {
  constructor(private groupsService: GroupsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createGroup(@Body() createGroup: CreateGroupDto) {
    return this.groupsService.createGroup(createGroup);
  }

  @Get()
  findAll() {
    return this.groupsService.getAll();
  }

  @Get('/:groupId')
  async getGroupById(@Param('groupId') groupId) {
    return this.groupsService.findByPostId(groupId);
  }

  @Delete('/:groupId')
  async deleteGroupById(@Param('groupId') groupId) {
    return this.groupsService.deleteRemarksById(groupId);
  }
}
