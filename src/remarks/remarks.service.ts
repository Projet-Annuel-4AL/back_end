import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Remark } from './remark.entity';
import { CreateRemarkDto } from './create-remark.dto';
import { PostsService } from '../posts/posts.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class RemarksService {
  constructor(
    @InjectRepository(Remark) private remarkRepository: Repository<Remark>,
    private postsService: PostsService,
    private usersService: UsersService,
  ) {}

  async createRemark(remarkCreate: CreateRemarkDto) {
    const remark: Remark = this.remarkRepository.create({
      post: await this.postsService.findByPostId(remarkCreate.idPost),
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
}
