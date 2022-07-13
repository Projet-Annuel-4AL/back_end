import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Follow } from './follow.entity';
import { CreateFollowDto } from './dto/create-follow.dto';
import { FollowNotFoundByIdException } from './exception/follow-not-found-by-id-exception';

@Injectable()
export class FollowsService {
  constructor(
    @InjectRepository(Follow)
    private followsRepository: Repository<Follow>,
  ) {}

  async createFollow(followCreate: CreateFollowDto) {
    try {
      const follow = this.followsRepository.create({
        idUserFollowed: followCreate.idUserFollowed,
        idUserFollowing: followCreate.idUserFollowing,
      });
      return this.followsRepository.save(follow);
    } catch (error) {
      throw new BadRequestException(followCreate, 'Follow creation error');
    }
  }

  async getAll(): Promise<Follow[]> {
    return await this.followsRepository.find({
      relations: ['followedUser', 'followingUser'],
    });
  }

  async findByFollowId(followId: number): Promise<Follow> {
    const follow = await this.followsRepository.findOne({
      where: { id: followId },
      relations: ['followedUser', 'followingUser'],
    });
    if (follow) {
      return follow;
    }
    throw new FollowNotFoundByIdException(followId);
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

  async findFollowingByUserId(idUser: number): Promise<Follow[]> {
    return await this.followsRepository.find({
      where: { idUserFollowing: idUser },
      relations: ['followedUser'],
    });
  }

  async findFollowedByUserId(idUser: number): Promise<Follow[]> {
    return await this.followsRepository.find({
      where: { idUserFollowed: idUser },
      relations: ['followingUser'],
    });
  }

  async deleteFollowById(followId: number) {
    const follow: Follow = await this.findByFollowId(followId);
    if (follow) {
      return await this.followsRepository.delete(followId);
    }
    throw new FollowNotFoundByIdException(followId);
  }

  async findFollowsByUserId(userId: number) {
    try {
      const follows: Follow[] = await this.followsRepository.find({
        where: { idUserFollowed: userId },
        relations: ['followedUser', 'followingUser'],
      });
      const following: Follow[] = await this.followsRepository.find({
        where: { idUserFollowed: userId },
        relations: ['followedUser', 'followingUser'],
      });
      follows.push(...following);
      return follows;
    } catch (error) {
      console.log(error);
    }
  }
}
