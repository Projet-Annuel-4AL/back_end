import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';
import { CreatePostDto } from './create-post.dto';
import { PostsService } from './posts.service';
import { CreateTextDto } from './post-body/texts/create-text.dto';
import { CreateCodeDto } from './post-body/codes/create-code.dto';
import { TextsService } from './post-body/texts/texts.service';
import { CodesService } from './post-body/codes/codes.service';

@Controller('api/posts')
export class PostsController {
  constructor(
    private postsService: PostsService,
    private textService: TextsService,
    private codeService: CodesService,
  ) {}

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

  @Post('texts')
  createText(@Body() createText: CreateTextDto) {
    return this.textService.createText(createText);
  }

  @Post('codes')
  createCode(@Body() createCode: CreateCodeDto) {
    return this.codeService.createCode(createCode);
  }
}
