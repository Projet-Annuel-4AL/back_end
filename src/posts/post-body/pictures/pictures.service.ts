import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Picture } from './picture.entity';
import { CreatePictureDto } from './dto/create-picture.dto';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';

@Injectable()
export class PicturesService {
  constructor(
    @InjectRepository(Picture) private pictureRepository: Repository<Picture>,
    private readonly configService: ConfigService,
  ) {}

  async createPicture(pictureCreate: CreatePictureDto) {
    const s3 = new S3();
    const uploadResult = await s3
      .upload({
        Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
        Body: pictureCreate.dataBuffer,
        Key: `${uuid()}-${pictureCreate.fileName}`,
      })
      .promise();

    const picture = this.pictureRepository.create({
      key: uploadResult.Key,
      url: uploadResult.Location,
    });
    return await this.pictureRepository.save(picture);
  }

  async getAll(): Promise<Picture[]> {
    return await this.pictureRepository.find();
  }

  async findByPictureId(pictureId: number): Promise<Picture> {
    const picture = await this.pictureRepository.findOne({
      where: { id: pictureId },
    });
    if (picture) {
      return picture;
    }
    throw new HttpException('Picture not found', HttpStatus.NOT_FOUND);
  }
}
