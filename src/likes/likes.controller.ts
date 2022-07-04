import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CreateLikeDto } from './create-like.dto';
import { LikesService } from './likes.service';

@Controller('api/likes')
export class LikesController {
  constructor(private likesService: LikesService) {}

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

  @Delete('/:likeId')
  async deleteLikesById(@Param('likeId') likeId) {
    return this.likesService.deleteLikesById(likeId);
  }
}
