import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Code } from './code.entity';
import { CreateCodeDto } from './create-code.dto';

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
    const codes = await this.codeRepository.find({
      where: { id: codeId },
    });
    return codes[0];
  }
}
