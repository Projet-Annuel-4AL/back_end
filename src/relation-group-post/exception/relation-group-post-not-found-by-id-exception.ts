import { NotFoundException } from '@nestjs/common';

export class RelationGroupPostNotFoundByIdException extends NotFoundException {
  constructor(relationId: number) {
    super(`Relation with id ${relationId} not found`);
  }
}
