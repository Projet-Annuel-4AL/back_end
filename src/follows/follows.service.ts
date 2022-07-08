import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Follow } from './follow.entity';
import { CreateFollowDto } from './create-follow.dto';

@Injectable()
export class FollowsService {
  constructor(
    @InjectRepository(Follow)
    private followsRepository: Repository<Follow>,
  ) {}

  async createFollow(followCreate: CreateFollowDto) {
    const follow = this.followsRepository.create({
      idUserFollowed: followCreate.idUserFollowed,
      idUserFollowing: followCreate.idUserFollowing,
    });
    return this.followsRepository.save(follow);
  }

  async getAll(): Promise<Follow[]> {
    return await this.followsRepository.find({
      relations: ['followedUser', 'followingUser'],
    });
  }

  async findByFollowId(followId: number): Promise<Follow> {
    const follows = await this.followsRepository.find({
      where: { id: followId },
    });
    return follows[0];
  }

  async findFollowByIdUserFollowingdAndIdUserFollower(
    idUserFollowing: number,
    idUserFollowed: number,
  ): Promise<Follow> {
    const follows = await this.followsRepository.find({
      where: {
        idUserFollowing: idUserFollowing,
        idUserFollowed: idUserFollowed,
      },
      relations: ['followedUser', 'followingUser'],
    });
    return follows[0];
  }

  async findFollowsByUserId(idUser: number): Promise<Follow[]> {
    return await this.followsRepository.find({
      where: { idUserFollowed: idUser },
      relations: ['followingUser'],
    });
  }

  async deleteFollowById(id: number) {
    return await this.followsRepository.delete(id);
  }
}
