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
      id: postCreate.id,
      title: postCreate.title,
      datePost: postCreate.datePost,
      description: postCreate.description,
      contentType: postCreate.contentType,
      idContent: postCreate.idContent,
      idUser: await this.usersService.findByUserId(postCreate.idUser),
    });
    return this.postRepository.save(post);
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
}
