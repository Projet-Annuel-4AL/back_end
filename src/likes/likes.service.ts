import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from './like.entity';
import { CreateLikeDto } from './create-like.dto';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Like) private likeRepository: Repository<Like>,
  ) {}

  async createLike(likeCreate: CreateLikeDto) {
    const like = this.likeRepository.create({
      idUser: likeCreate.idUser,
      idPost: likeCreate.idPost,
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

  async findByUserId(userId: number): Promise<Like[]> {
    return await this.likeRepository.find({
      where: { idPost: userId },
    });
  }
}
