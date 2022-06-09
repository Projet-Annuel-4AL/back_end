import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Picture } from './picture.entity';
import { CreatePictureDto } from './create-picture.dto';

@Injectable()
export class PicturesService {
  constructor(
    @InjectRepository(Picture) private pictureRepository: Repository<Picture>,
  ) {}

  async createPicture(pictureCreate: CreatePictureDto) {
    const picture = this.pictureRepository.create({
      type: pictureCreate.type,
      url: pictureCreate.url,
    });
    return this.pictureRepository.save(picture);
  }

  async getAll(): Promise<Picture[]> {
    return await this.pictureRepository.find();
  }

  async findByPictureId(pictureId: number): Promise<Picture> {
    const pictures = await this.pictureRepository.find({
      where: { id: pictureId },
    });
    return pictures[0];
  }
}
