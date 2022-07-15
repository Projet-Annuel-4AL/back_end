import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from './like.entity';
import { CreateLikeDto } from './dto/create-like.dto';
import { UsersService } from '../users/users.service';
import { Post } from '../posts/post.entity';
import { LikeNotFoundByIdException } from './exception/like-not-found-by-id-exception';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Like) private likeRepository: Repository<Like>,
    private usersService: UsersService,
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}

  async createLike(likeCreate: CreateLikeDto) {
    try {
      const like = this.likeRepository.create({
        user: await this.usersService.findByUserId(likeCreate.idUser),
        post: await this.postRepository.findOne({
          where: { id: likeCreate.idPost },
        }),
      });
      return this.likeRepository.save(like);
    } catch (error) {
      throw new BadRequestException(likeCreate, 'Follow creation error');
    }
  }

  async getAll(): Promise<Like[]> {
    return await this.likeRepository.find();
  }

  async findByLikeId(likeId: number): Promise<Like> {
    const like = await this.likeRepository.findOne({
      where: { id: likeId },
    });
    if (like) {
      return like;
    }
    throw new LikeNotFoundByIdException(likeId);
  }

  async findByPostId(postId: number): Promise<Like[]> {
    return await this.likeRepository.find({
      where: { idPost: postId },
    });
  }

  async findLikeByUserIdAndPostId(
    idUser: number,
    idPost: number,
  ): Promise<Like> {
    const like = await this.likeRepository.findOne({
      where: { idPost: idPost, idUser: idUser },
    });
    if (like) {
      return like;
    }
    throw new LikeNotFoundByIdException(null);
  }

  async findByUserId(userId: number): Promise<Like[]> {
    return await this.likeRepository.find({
      where: { idUser: userId },
    });
  }

  async deleteLikesById(id: number) {
    const like = await this.likeRepository.delete(id);
    if (like) {
      return await this.likeRepository.delete(id);
    }
    throw new LikeNotFoundByIdException(id);
  }

  async deleteLikesByPostId(postId: number) {
    try {
      const likes: Like[] = await this.findByPostId(postId);
      likes.map(async (like) => {
        await this.deleteLikesById(like.id);
      });
    } catch (error) {
      throw new HttpException(
        'Likes delete error: ' + error,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
