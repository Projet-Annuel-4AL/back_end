import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from './group.entity';
import { UpdateGroupDto } from './dto/update-group.dto';
import { GroupNotFoundByIdException } from './exception/group-not-found-by-id-exception';
import { NotGroupOwnerException } from './exception/not-group-owner-exception';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group) private groupRepository: Repository<Group>,
  ) {}

  createGroup(createGroup: CreateGroupDto): Promise<Group> {
    try {
      const group: Group = this.groupRepository.create({
        name: createGroup.name,
        theme: createGroup.theme,
        description: createGroup.description,
        idGroupOwner: createGroup.idGroupOwner,
      });
      return this.groupRepository.save(group);
    } catch (error) {
      throw new BadRequestException(createGroup, 'Group creation error');
    }
  }

  async getAll(): Promise<Group[]> {
    return await this.groupRepository.find();
  }

  async findByGroupId(groupId: number): Promise<Group> {
    const group: Group = await this.groupRepository.findOne(groupId);
    if (group) {
      return group;
    }
    throw new GroupNotFoundByIdException(groupId);
  }

  async deleteGroupById(groupId: number) {
    const group: Group = await this.findByGroupId(groupId);
    if (group) {
      await this.groupRepository.delete(groupId);
    }
    throw new GroupNotFoundByIdException(groupId);
  }

  getGroupsByTheme(theme: string): Promise<Group[]> {
    return this.groupRepository.find({
      where: { theme: theme },
    });
  }

  async updateGroup(
    groupId: number,
    userId: number,
    groupUpdate: UpdateGroupDto,
  ) {
    const group: Group = await this.findByGroupId(groupId);
    if (group.idGroupOwner != userId) {
      throw new NotGroupOwnerException(groupId);
    }
    await this.groupRepository.update(groupId, groupUpdate);
    const updatedGroup = await this.groupRepository.findOne(groupId);
    if (updatedGroup) {
      return updatedGroup;
    }
    throw new GroupNotFoundByIdException(groupId);
  }
}
