import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GroupsService } from './groups.service';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

@Controller('api/groups')
export class GroupsController {
  constructor(private groupsService: GroupsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createGroup(@Body() createGroup: CreateGroupDto) {
    return this.groupsService.createGroup(createGroup);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':groupId/owner/:userId')
  async updateGroup(
    @Param('groupId') groupId: number,
    @Param('userId') userId: number,
    @Body() groupUpdate: UpdateGroupDto,
  ) {
    return this.groupsService.updateGroup(groupId, userId, groupUpdate);
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
    return this.groupsService.findByGroupId(groupId);
  }

  @Delete('/:groupId')
  async deleteGroupById(@Param('groupId') groupId: number) {
    return this.groupsService.deleteGroupById(groupId);
  }
}
