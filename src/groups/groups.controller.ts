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

@Controller('api/groups')
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

  @Get('/themes/:theme')
  getGroupsByTheme(@Param('theme') theme: string) {
    return this.groupsService.getGroupsByTheme(theme);
  }

  @Get('/:groupId')
  async getGroupById(@Param('groupId') groupId: number) {
    return this.groupsService.findByPostId(groupId);
  }

  @Delete('/:groupId')
  async deleteGroupById(@Param('groupId') groupId: number) {
    return this.groupsService.deleteGroupById(groupId);
  }
}
