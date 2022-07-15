import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRelationGroupUserDto } from './dto/create-relation-group-user.dto';
import { RelationGroupUser } from './relation-group-user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RelationGroupPostNotFoundByIdException } from '../relation-group-post/exception/relation-group-post-not-found-by-id-exception';

@Injectable()
export class RelationGroupUserService {
  constructor(
    @InjectRepository(RelationGroupUser)
    private relationGroupUserRepository: Repository<RelationGroupUser>,
  ) {}

  createRelation(
    createRelation: CreateRelationGroupUserDto,
  ): Promise<RelationGroupUser> {
    try {
      const relation = this.relationGroupUserRepository.create({
        idUser: createRelation.idUser,
        idGroup: createRelation.idGroup,
      });
      return this.relationGroupUserRepository.save(relation);
    } catch (error) {
      throw new BadRequestException(createRelation, 'Follow creation error');
    }
  }

  getAll(): Promise<RelationGroupUser[]> {
    return this.relationGroupUserRepository.find();
  }

  async getRelationById(relationId: number): Promise<RelationGroupUser> {
    const relation = await this.relationGroupUserRepository.findOne({
      where: { id: relationId },
    });
    if (relation) {
      return relation;
    }
    throw new RelationGroupPostNotFoundByIdException(relationId);
  }

  async getRelationsByGroupId(groupId: number): Promise<RelationGroupUser[]> {
    return await this.relationGroupUserRepository.find({
      where: { idGroup: groupId },
      relations: ['user'],
    });
  }

  async getRelationsByUserId(userId: number): Promise<RelationGroupUser[]> {
    return await this.relationGroupUserRepository.find({
      where: { idUser: userId },
      relations: ['group'],
    });
  }

  async deleteRelationById(relationId: number) {
    const relation = await this.relationGroupUserRepository.delete(relationId);
    if (relation) {
      return await this.relationGroupUserRepository.delete(relationId);
    }
    throw new RelationGroupPostNotFoundByIdException(relationId);
  }
}
