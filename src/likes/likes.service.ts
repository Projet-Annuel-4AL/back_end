import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from './like.entity';
import { CreateLikeDto } from './create-like.dto';
import { UsersService } from '../users/users.service';
import { Post } from '../posts/post.entity';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Like) private likeRepository: Repository<Like>,
    private usersService: UsersService,
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}

  async createLike(likeCreate: CreateLikeDto) {
    const posts: Post[] = await this.postRepository.find({
      where: { id: likeCreate.idPost },
    });
    const like = this.likeRepository.create({
      user: await this.usersService.findByUserId(likeCreate.idUser),
      post: posts[0],
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
    idUser: number,
    idPost: number,
  ): Promise<Like> {
    const likes = await this.likeRepository.find({
      where: { idPost: idPost, idUser: idUser },
    });
    return likes[0];
  }

  async findByUserId(userId: number): Promise<Like[]> {
    return await this.likeRepository.find({
      where: { idUser: userId },
    });
  }

  async deleteLikesById(id: number) {
    return await this.likeRepository.delete(id);
  }

  async deleteLikesByPostId(postId: number) {
    try {
      const likes: Like[] = await this.findByPostId(postId);
      likes.map((like) => {
        this.deleteLikesById(like.id);
      });
    } catch (error) {
      console.log('likes delete error: ' + error);
    }
  }
}
