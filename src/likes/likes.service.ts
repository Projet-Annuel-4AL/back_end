import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from './like.entity';
import { CreateLikeDto } from './create-like.dto';
import { UsersService } from '../users/users.service';
import { PostsService } from '../posts/posts.service';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Like) private likeRepository: Repository<Like>,
    private usersService: UsersService,
    private postsService: PostsService,
  ) {}

  async createLike(likeCreate: CreateLikeDto) {
    const like = this.likeRepository.create({
      user: await this.usersService.findByUserId(likeCreate.idUser),
      post: await this.postsService.findByPostId(likeCreate.idPost),
    });
    return this.likeRepository.save(like);
  }

  async getAll(): Promise<Like[]> {
    return await this.likeRepository.find();
  }

  async findByLikeId(likeId: number): Promise<Like> {
    const likes = await this.likeRepository.find({
      where: { id: likeId },
    });
    return likes[0];
  }

  async findByPostId(postId: number): Promise<Like[]> {
    return await this.likeRepository.find({
      where: { idPost: postId },
    });
  }

  async findLikeByUserIdAndPostId(
    userId: number,
    postId: number,
  ): Promise<Like[]> {
    return await this.likeRepository.find({
      where: { idPost: postId, idUser: userId },
    });
  }

  async findByUserId(userId: number): Promise<Like[]> {
    return await this.likeRepository.find({
      where: { idUser: userId },
    });
  }

  async deleteLikesByPostId(id: number) {
    return await this.likeRepository.delete(id);
  }
}
