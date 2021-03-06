import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UsersService } from '../users/users.service';
import { TextsService } from './post-body/texts/texts.service';
import { CodesService } from './post-body/codes/codes.service';
import { PostNotFoundByIdException } from './exception/post-not-found-by-id-exception';
import { UpdatePostDto } from './dto/update-post.dto';
import { MercureService } from '../mercure/mercure.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
    private usersService: UsersService,
    private textsService: TextsService,
    private codesService: CodesService,
    private mercureService: MercureService,
  ) {}

  async createPost(postCreate: CreatePostDto) {
    const post: Post = this.postRepository.create({
      title: postCreate.title,
      idVideo: postCreate.idVideo,
      idPicture: postCreate.idPicture,
      user: await this.usersService.findByUserId(postCreate.idUser),
      code: await this.codesService.findByCodeId(postCreate.idCode),
      text: await this.textsService.findByTextId(postCreate.idText),
    });
    try {
      // TODO fix mercure
      // this.mercureService.sendPostsUpdate();
    } catch (e) {
      console.log(e);
    }
    return this.postRepository.save(post);
  }

  async getAll(): Promise<Post[]> {
    return await this.postRepository.find({
      relations: ['user', 'code', 'text', 'likes', 'remarks'],
      order: {
        id: 'DESC',
      },
    });
  }

  async findByPostId(postId: number): Promise<Post> {
    const post = await this.postRepository.findOne({
      where: { id: postId },
      relations: ['user', 'code', 'text', 'remarks'],
    });
    if (post) {
      return post;
    }
    throw new PostNotFoundByIdException(postId);
  }

  async findByUserId(userId: number): Promise<Post[]> {
    return this.postRepository.find({
      where: { idUser: userId },
      relations: ['user', 'code', 'text', 'likes', 'remarks'],
    });
  }

  async deletePostById(postId: number) {
    const post: Post = await this.findByPostId(postId);
    if (post) {
      try {
        // TODO fix mercure
        // this.mercureService.sendPostsUpdate();
      } catch (e) {
        console.log(e);
        return;
      }
      return await this.postRepository.delete(postId);
    }
    throw new PostNotFoundByIdException(postId);
  }

  async updatePost(postId: number, postUpdate: UpdatePostDto) {
    const post = await this.findByPostId(postId);
    try {
      if (postUpdate.text) {
        await this.textsService.updateText(post.text.id, postUpdate.text);
      } else if (postUpdate.code) {
        await this.codesService.updateCode(post.code.id, postUpdate.code);
      }
    } catch (error) {
      throw new HttpException(
        'Unable to change post content',
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.postRepository.update(postId, postUpdate.title);
    const updatedPost = await this.findByPostId(postId);
    if (updatedPost) {
      try {
        // TODO fix mercure
        // this.mercureService.sendPostsUpdate();
      } catch (e) {
        console.log(e);
      }
      return updatedPost;
    }
    throw new PostNotFoundByIdException(postId);
  }
}
