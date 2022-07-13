import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Remark } from './remark.entity';
import { CreateRemarkDto } from './dto/create-remark.dto';
import { UsersService } from '../users/users.service';
import { Post } from '../posts/post.entity';

@Injectable()
export class RemarksService {
  constructor(
    @InjectRepository(Remark) private remarkRepository: Repository<Remark>,
    @InjectRepository(Post) private postRepository: Repository<Post>,
    private usersService: UsersService,
  ) {}

  async createRemark(remarkCreate: CreateRemarkDto): Promise<Remark> {
    const posts: Post[] = await this.postRepository.find({
      where: { id: remarkCreate.idPost },
    });
    const remark: Remark = this.remarkRepository.create({
      post: posts[0],
      idParentRemark: remarkCreate.idParentRemark,
      content: remarkCreate.content,
      user: await this.usersService.findByUserId(remarkCreate.idUser),
    });
    return this.remarkRepository.save(remark);
  }

  async getAll(): Promise<Remark[]> {
    return await this.remarkRepository.find();
  }

  async findByRemarkId(remarkId: number): Promise<Remark> {
    const remarks = await this.remarkRepository.find({
      where: { id: remarkId },
    });
    return remarks[0];
  }

  async findByPostId(postId: number): Promise<Remark[]> {
    return await this.remarkRepository.find({
      where: { idPost: postId },
    });
  }

  async deleteRemarksById(id: number) {
    return await this.remarkRepository.delete(id);
  }

  async deleteRemarksByPostId(postId: number) {
    try {
      const remarks: Remark[] = await this.findByPostId(postId);
      remarks.map((remark) => {
        this.deleteRemarksById(remark.id);
      });
    } catch (error) {
      console.log('likes delete error: ' + error);
    }
  }
}
