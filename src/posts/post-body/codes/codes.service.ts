import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Code } from './code.entity';
import { CreateCodeDto } from './dto/create-code.dto';
import { UpdateCodeDto } from './dto/update-code.dto';
import { LikeNotFoundByIdException } from '../../../likes/exception/like-not-found-by-id-exception';

@Injectable()
export class CodesService {
  constructor(
    @InjectRepository(Code) private codeRepository: Repository<Code>,
  ) {}

  async createCode(codeCreate: CreateCodeDto) {
    const code = this.codeRepository.create({
      language: codeCreate.language,
      content: codeCreate.content,
    });
    return this.codeRepository.save(code);
  }

  async getAll(): Promise<Code[]> {
    return await this.codeRepository.find();
  }

  async findByCodeId(codeId: number): Promise<Code> {
    if (!codeId) {
      return;
    }
    return await this.codeRepository.findOne({
      where: { id: codeId },
    });
  }

  deleteCodeById(codeId: number) {
    this.codeRepository.delete(codeId);
  }

  async updateCode(codeId: number, codeUpdate: UpdateCodeDto) {
    await this.codeRepository.update(codeId, codeUpdate);
    const updatedCode = await this.codeRepository.findOne({
      where: { id: codeId },
    });
    if (updatedCode) {
      return updatedCode;
    }
    throw new LikeNotFoundByIdException(codeId);
  }
}
