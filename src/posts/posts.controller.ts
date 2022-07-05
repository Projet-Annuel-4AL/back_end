import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';
import { CreatePostDto } from './create-post.dto';
import { PostsService } from './posts.service';

@Controller('api/posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  findAllPost() {
    return this.postsService.getAll();
  }

  @Get('/:postId')
  getPostById(@Param('postId') postId) {
    return this.postsService.findByPostId(postId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createPost(@Body() createPost: CreatePostDto) {
    return this.postsService.createPost(createPost);
  }

  @Get('/id/:userId')
  async findByUserId(@Param('userId') userId: number) {
    return this.postsService.findByUserId(userId);
  }
}
