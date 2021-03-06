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
import { JwtAuthGuard } from '../auth/jwt-auth-guard';
import { RelationGroupPostService } from './relation-group-post.service';
import { CreateRelationGroupPostDto } from './dto/create-relation-group-post.dto';

@Controller('api/relation-group-post')
export class RelationGroupPostController {
  constructor(private relationGroupPostService: RelationGroupPostService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createRelation(@Body() createRelation: CreateRelationGroupPostDto) {
    return this.relationGroupPostService.createRelation(createRelation);
  }

  //TODO possiblement ca degage
  @Get()
  findAllRelations(
    @Query('idGroup') idGroup?: number,
    @Query('idPost') idPost?: number,
  ) {
    if (this.isNotEmptyParam(idPost) && this.isNotEmptyParam(idGroup)) {
      return this.relationGroupPostService.findRelationsByGroupIdAndPostId(
        idPost,
        idGroup,
      );
    }
    return this.relationGroupPostService.getAll();
  }

  isNotEmptyParam(param: number): boolean {
    return param != null;
  }

  @Get('/:relationId')
  async getRelationById(@Param('relationId') relationId) {
    return this.relationGroupPostService.getRelationById(relationId);
  }

  @Get('/posts/:groupId')
  async getRelationByGroupId(@Param('groupId') groupId) {
    return this.relationGroupPostService.getRelationsByGroupId(groupId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:relationId')
  async deleteRelationById(@Param('relationId') relationId) {
    return this.relationGroupPostService.deleteRelationById(relationId);
  }
}
