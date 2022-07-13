import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UsersService } from '../users/users.service';
import { TextsService } from './post-body/texts/texts.service';
import { CodesService } from './post-body/codes/codes.service';
import { LikesService } from '../likes/likes.service';
import { RemarksService } from '../remarks/remarks.service';
import { PostNotFoundByIdException } from './exception/post-not-found-by-id-exception';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
    private usersService: UsersService,
    private textsService: TextsService,
    private codesService: CodesService,
    private likesService: LikesService,
    private remarksService: RemarksService,
  ) {}

  async createPost(postCreate: CreatePostDto) {
    const post: Post = this.postRepository.create({
      title: postCreate.title,
      createdDate: postCreate.createdDate,
      idVideo: postCreate.idVideo,
      idPicture: postCreate.idPicture,
      user: await this.usersService.findByUserId(postCreate.idUser),
      code: await this.codesService.findByCodeId(postCreate.idCode),
      text: await this.textsService.findByTextId(postCreate.idText),
    });
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
    try {
      const post: Post = await this.findByPostId(postId);
      await this.remarksService.deleteRemarksByPostId(postId);
      await this.likesService.deleteLikesByPostId(postId);
      await this.postRepository.delete(postId);
      if (post.code != null) {
        this.codesService.deleteCodeById(post.code.id);
      } else if (post.text != null) {
        this.textsService.deleteTextById(post.text.id);
      }
    } catch (error) {
      console.log('likes delete error: ' + error);
    }
  }

  async updatePost(postId: number, postUpdate: UpdatePostDto) {
    const post = await this.findByPostId(postId);
    try {
      if (postUpdate.text) {
        await this.textsService.updateText(post.text.id, postUpdate.text);
      } else if (postUpdate.code) {
        await this.codesService.updateText(post.code.id, postUpdate.code);
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
      return updatedPost;
    }
    throw new PostNotFoundByIdException(postId);
  }
}
