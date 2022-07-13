import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RelationGroupPost } from './relation-group-post.entity';
import { CreateRelationGroupPostDto } from './dto/create-relation-group-post.dto';

@Injectable()
export class RelationGroupPostService {
  constructor(
    @InjectRepository(RelationGroupPost)
    private relationGroupPostRepository: Repository<RelationGroupPost>,
  ) {}

  createRelation(
    createRelation: CreateRelationGroupPostDto,
  ): Promise<RelationGroupPost> {
    const relation = this.relationGroupPostRepository.create({
      idPost: createRelation.idPost,
      idGroup: createRelation.idGroup,
    });
    return this.relationGroupPostRepository.save(relation);
  }

  getAll(): Promise<RelationGroupPost[]> {
    return this.relationGroupPostRepository.find();
  }

  async getRelationById(relationId: number): Promise<RelationGroupPost> {
    const relations = await this.relationGroupPostRepository.find({
      where: { id: relationId },
    });
    return relations[0];
  }

  async getRelationsByGroupId(groupId: number): Promise<RelationGroupPost[]> {
    return await this.relationGroupPostRepository.find({
      where: { idGroup: groupId },
      relations: ['post'],
    });
  }

  async deleteRelationById(relationId: number) {
    await this.relationGroupPostRepository.delete(relationId);
  }
}
