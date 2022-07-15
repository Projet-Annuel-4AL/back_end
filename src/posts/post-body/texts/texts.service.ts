import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Text } from './text.entity';
import { CreateTextDto } from './dto/create-text.dto';
import { UpdateTextDto } from './dto/update-text.dto';

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

  deleteTextById(textId: number) {
    this.textRepository.delete(textId);
  }

  async updateText(textId: number, textUpdate: UpdateTextDto) {
    await this.textRepository.update(textId, textUpdate);
  }
}
