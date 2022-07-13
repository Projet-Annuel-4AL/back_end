import { BadRequestException } from '@nestjs/common';

export class NotGroupOwnerException extends BadRequestException {
  constructor(groupId: number) {
    super(`Not the owner of the group with id ${groupId}`);
  }
}
