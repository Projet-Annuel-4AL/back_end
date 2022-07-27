import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Collab } from './collab.entity';
import { CreateCollabDto } from './dto/create-collab.dto';
import { CodesService } from '../posts/post-body/codes/codes.service';
import { GroupsService } from '../groups/groups.service';

@Injectable()
export class CollabService {
  constructor(
    @InjectRepository(Collab) private collabRepository: Repository<Collab>,
    private codesService: CodesService,
    private groupsService: GroupsService,
  ) {}

  async createCollab(createCollab: CreateCollabDto) {
    const code = await this.codesService.createCode({
      language: '0',
      content:
        'public class Main{\n' +
        '\tpublic static void main(String [] args){\n' +
        '\t\tSystem.out.println("Hello Java!");\n' +
        '\t}\n' +
        '}',
    });
    if (!code) {
      throw new BadRequestException();
    }
    const collab = this.collabRepository.create({
      group: await this.groupsService.findByGroupId(createCollab.idGroup),
      code: code,
    });
    if (collab) {
      return this.collabRepository.save(collab);
    }
    throw new BadRequestException(CreateCollabDto, 'Create collab error');
  }

  async getCollabByGroupId(groupId: number) {
    const collab = await this.collabRepository.findOne({
      where: { idGroup: groupId },
      relations: ['group', 'code'],
    });
    if (collab) {
      return collab;
    }
    throw new BadRequestException(Collab, 'Get collab error');
  }

  async deleteCollabByGroupId(groupId) {
    const collab = await this.collabRepository.delete({ idGroup: groupId });
    if (collab) {
      return collab;
    }
    throw new BadRequestException(Collab, 'Delete collab error');
  }
}
