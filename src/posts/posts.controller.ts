import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';
import { CreatePostDto } from './create-post.dto';
import { PostsService } from './posts.service';

@Controller('api/posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  findAllPost() {
    console.log(this.postsService.getAll());
    return this.postsService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createPost(@Body() createPost: CreatePostDto) {
    console.log(createPost);
    return this.postsService.createPost(createPost);
  }
}
