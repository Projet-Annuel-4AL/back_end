import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Remark } from './remark.entity';
import { CreateRemarkDto } from './create-remark.dto';

@Injectable()
export class RemarksService {
  constructor(
    @InjectRepository(Remark) private remarkRepository: Repository<Remark>,
  ) {}

  async createRemark(remarkCreate: CreateRemarkDto) {
    const remark = this.remarkRepository.create({
      idPost: remarkCreate.idPost,
      idParentRemark: remarkCreate.idParentRemark,
      content: remarkCreate.content,
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
}
