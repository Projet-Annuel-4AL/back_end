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
import { CreateLikeDto } from './dto/create-like.dto';
import { LikesService } from './likes.service';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';

@Controller('api/likes')
export class LikesController {
  constructor(private likesService: LikesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createLike(@Body() createLike: CreateLikeDto) {
    return this.likesService.createLike(createLike);
  }

  @Get()
  findAllLikes(
    @Query('idUser') idUser?: number,
    @Query('idPost') idPost?: number,
  ) {
    if (this.isNotEmptyParam(idUser) && this.isNotEmptyParam(idPost)) {
      return this.likesService.findLikeByUserIdAndPostId(idUser, idPost);
    }
    return this.likesService.getAll();
  }

  isNotEmptyParam(param: number): boolean {
    return param != null;
  }

  @Get('/:userId')
  async getLikesByUserId(@Param('userId') userId) {
    return this.likesService.findByUserId(userId);
  }

  @Get('/:postId')
  async getLikesByPostId(@Param('postId') postId) {
    return this.likesService.findByPostId(postId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:likeId')
  async deleteLikesById(@Param('likeId') likeId) {
    return this.likesService.deleteLikesById(likeId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/posts/:postId')
  async deleteLikesByPostId(@Param('postId') postId) {
    return this.likesService.deleteLikesByPostId(postId);
  }
}
