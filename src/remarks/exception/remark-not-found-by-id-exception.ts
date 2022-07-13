import { NotFoundException } from '@nestjs/common';

export class RemarkNotFoundByIdException extends NotFoundException {
  constructor(remarkId: number) {
    super(`Remark with id ${remarkId} not found`);
  }
}
