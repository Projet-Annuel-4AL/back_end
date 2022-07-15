import { NotFoundException } from '@nestjs/common';

export class GroupNotFoundByIdException extends NotFoundException {
  constructor(groupId: number) {
    super(`Group with id ${groupId} not found`);
  }
}
