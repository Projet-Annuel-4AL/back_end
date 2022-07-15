import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Video } from './video.entity';
import { CreateVideoDto } from './dto/create-video.dto';

@Injectable()
export class VideosService {
  constructor(
    @InjectRepository(Video) private videoRepository: Repository<Video>,
  ) {}

  async createVideo(videoCreate: CreateVideoDto) {
    const video = this.videoRepository.create({
      type: videoCreate.type,
      url: videoCreate.url,
    });
    return this.videoRepository.save(video);
  }

  async getAll(): Promise<Video[]> {
    return await this.videoRepository.find();
  }

  async findByPVideoId(videoId: number): Promise<Video> {
    const videos = await this.videoRepository.find({
      where: { id: videoId },
    });
    return videos[0];
  }
}
