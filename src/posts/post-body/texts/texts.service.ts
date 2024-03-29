import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Text } from './text.entity';
import { CreateTextDto } from './create-text.dto';

@Injectable()
export class TextsService {
  constructor(
    @InjectRepository(Text) private textRepository: Repository<Text>,
  ) {}

  async createText(textCreate: CreateTextDto) {
    const text = this.textRepository.create({
      content: textCreate.content,
    });
    return this.textRepository.save(text);
  }

  async getAll(): Promise<Text[]> {
    return await this.textRepository.find();
  }

  async findByTextId(textId: number): Promise<Text> {
    const texts = await this.textRepository.find({
      where: { id: textId },
    });
    return texts[0];
  }
}
