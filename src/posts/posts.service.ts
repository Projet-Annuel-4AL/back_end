import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './create-post.dto';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
    @InjectRepository(User) private usersService: UsersService,
  ) {}

  async createPost(postCreate: CreatePostDto) {
    const post = this.postRepository.create({
      title: postCreate.title,
      createdDate: postCreate.createdDate,
      idVideo: postCreate.idVideo,
      idPicture: postCreate.idPicture,
      idCode: postCreate.idCode,
      idText: postCreate.idText,
      idUser: postCreate.idUser,
    });
    return this.postRepository.save(post);
  }

  async getAll(): Promise<Post[]> {
    return await this.postRepository.find();
  }

  async findByPostId(postId: number): Promise<Post> {
    const posts = await this.postRepository.find({
      where: { id: postId },
    });
    return posts[0];
  }

  async findByUserId(userId: number): Promise<Post[]> {
    return this.postRepository.find({
      where: { idUser: userId },
    });
  }

  deletePostById(postId: number) {
    this.postRepository.delete(postId);
  }
}
