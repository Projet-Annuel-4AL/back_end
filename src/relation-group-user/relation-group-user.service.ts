import { Injectable } from '@nestjs/common';
import { CreateRelationGroupUserDto } from './create-relation-group-user.dto';
import { RelationGroupUser } from './relation-group-user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RelationGroupUserService {
  constructor(
    @InjectRepository(RelationGroupUser)
    private relationGroupUserRepository: Repository<RelationGroupUser>,
  ) {}

  createRelation(
    createRelation: CreateRelationGroupUserDto,
  ): Promise<RelationGroupUser> {
    const relation = this.relationGroupUserRepository.create({
      idUser: createRelation.idUser,
      idGroup: createRelation.idGroup,
    });
    return this.relationGroupUserRepository.save(relation);
  }

  getAll(): Promise<RelationGroupUser[]> {
    return this.relationGroupUserRepository.find();
  }

  async getRelationById(relationId: number): Promise<RelationGroupUser> {
    const relations = await this.relationGroupUserRepository.find({
      where: { id: relationId },
    });
    return relations[0];
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

  deleteRelationById(relationId: number) {
    this.relationGroupUserRepository.delete(relationId);
  }
}
