import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { RelationGroupUserService } from './relation-group-user.service';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';
import { CreateRelationGroupUserDto } from './dto/create-relation-group-user.dto';

@Controller('api/relation-group-user')
export class RelationGroupUserController {
  constructor(private relationGroupUserService: RelationGroupUserService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createRelation(@Body() createRelation: CreateRelationGroupUserDto) {
    return this.relationGroupUserService.createRelation(createRelation);
  }

  @Get()
  findAllRelations(
    @Query('idGroup') idGroup?: number,
    @Query('idUser') idUser?: number,
  ) {
    if (this.isNotEmptyParam(idUser) && this.isNotEmptyParam(idGroup)) {
      return this.relationGroupUserService.findRelationsByGroupIdAndPostId(
        idUser,
        idGroup,
      );
    }
    return this.relationGroupUserService.getAll();
  }

  isNotEmptyParam(param: number): boolean {
    return param != null;
  }

  @Get('/:relationId')
  async getRelationById(@Param('relationId') relationId) {
    return this.relationGroupUserService.getRelationById(relationId);
  }

  @Get('/users/:groupId')
  async getRelationByGroupId(@Param('groupId') groupId) {
    return this.relationGroupUserService.getRelationsByGroupId(groupId);
  }

  @Get('/groups/:userId')
  async getRelationByUserId(@Param('userId') userId) {
    return this.relationGroupUserService.getRelationsByUserId(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:relationId')
  async deleteRelationById(@Param('relationId') relationId) {
    return this.relationGroupUserService.deleteRelationById(relationId);
  }
}
