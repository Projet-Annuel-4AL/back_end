import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RelationGroupPost } from './relation-group-post.entity';
import { CreateRelationGroupPostDto } from './dto/create-relation-group-post.dto';
import { RelationGroupPostNotFoundByIdException } from './exception/relation-group-post-not-found-by-id-exception';

@Injectable()
export class RelationGroupPostService {
  constructor(
    @InjectRepository(RelationGroupPost)
    private relationGroupPostRepository: Repository<RelationGroupPost>,
  ) {}

  createRelation(
    createRelation: CreateRelationGroupPostDto,
  ): Promise<RelationGroupPost> {
    try {
      const relation = this.relationGroupPostRepository.create({
        idPost: createRelation.idPost,
        idGroup: createRelation.idGroup,
      });
      return this.relationGroupPostRepository.save(relation);
    } catch (error) {
      throw new BadRequestException(createRelation, 'Follow creation error');
    }
  }

  getAll(): Promise<RelationGroupPost[]> {
    return this.relationGroupPostRepository.find();
  }

  async getRelationById(relationId: number): Promise<RelationGroupPost> {
    const relation = await this.relationGroupPostRepository.findOne({
      where: { id: relationId },
    });
    if (relation) {
      return relation;
    }
    throw new RelationGroupPostNotFoundByIdException(relationId);
  }

  async getRelationsByGroupId(groupId: number): Promise<RelationGroupPost[]> {
    return await this.relationGroupPostRepository.find({
      where: { idGroup: groupId },
      relations: ['post'],
    });
  }

  async deleteRelationById(relationId: number) {
    const relation = await this.relationGroupPostRepository.delete(relationId);
    if (relation) {
      return await this.relationGroupPostRepository.delete(relationId);
    }
    throw new RelationGroupPostNotFoundByIdException(relationId);
  }
}
