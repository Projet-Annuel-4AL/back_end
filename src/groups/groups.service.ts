import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './create-group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from './group.entity';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group) private groupRepository: Repository<Group>,
  ) {}

  createGroup(createGroup: CreateGroupDto): Promise<Group> {
    const group: Group = this.groupRepository.create({
      name: createGroup.name,
      theme: createGroup.theme,
      description: createGroup.description,
      idGroupOwner: createGroup.idGroupOwner,
    });
    return this.groupRepository.save(group);
  }

  async getAll(): Promise<Group[]> {
    return await this.groupRepository.find();
  }

  async findByPostId(groupId: number): Promise<Group> {
    const groups = await this.groupRepository.find({
      where: { id: groupId },
    });
    return groups[0];
  }

  deleteGroupById(groupId: number) {
    this.groupRepository.delete(groupId);
  }

  getGroupsByTheme(theme: string): Promise<Group[]> {
    return this.groupRepository.find({
      where: { theme: theme },
    });
  }
}
