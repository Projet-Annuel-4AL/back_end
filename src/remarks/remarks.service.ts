import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Remark } from './remark.entity';
import { CreateRemarkDto } from './dto/create-remark.dto';
import { UsersService } from '../users/users.service';
import { Post } from '../posts/post.entity';
import { RemarkNotFoundByIdException } from './exception/remark-not-found-by-id-exception';

@Injectable()
export class RemarksService {
  constructor(
    @InjectRepository(Remark) private remarkRepository: Repository<Remark>,
    @InjectRepository(Post) private postRepository: Repository<Post>,
    private usersService: UsersService,
  ) {}

  async createRemark(remarkCreate: CreateRemarkDto): Promise<Remark> {
    try {
      const remark: Remark = this.remarkRepository.create({
        post: await this.postRepository.findOne({
          where: { id: remarkCreate.idPost },
        }),
        idPost: remarkCreate.idPost,
        idParentRemark: remarkCreate.idParentRemark,
        content: remarkCreate.content,
        user: await this.usersService.findByUserId(remarkCreate.idUser),
      });
      return this.remarkRepository.save(remark);
    } catch (error) {
      throw new BadRequestException(remarkCreate, 'Follow creation error');
    }
  }

  async getAll(): Promise<Remark[]> {
    return await this.remarkRepository.find();
  }

  async findByRemarkId(remarkId: number): Promise<Remark> {
    const remark = await this.remarkRepository.findOne({
      where: { id: remarkId },
    });
    if (remark) {
      return remark;
    }
    throw new RemarkNotFoundByIdException(remarkId);
  }

  async findByPostId(postId: number): Promise<Remark[]> {
    return await this.remarkRepository.find({
      where: { idPost: postId },
    });
  }

  async deleteRemarksById(id: number) {
    const remark = await this.remarkRepository.delete(id);
    if (remark) {
      return await this.remarkRepository.delete(id);
    }
    throw new RemarkNotFoundByIdException(id);
  }

  async deleteRemarksByPostId(postId: number) {
    try {
      const remarks: Remark[] = await this.findByPostId(postId);
      remarks.map((remark) => {
        this.deleteRemarksById(remark.id);
      });
    } catch (error) {
      throw new HttpException(
        'Remarks delete error: ' + error,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
