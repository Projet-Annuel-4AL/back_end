import { NotFoundException } from '@nestjs/common';

export class LikeNotFoundByIdException extends NotFoundException {
  constructor(likeId: number) {
    super(`Like with id ${likeId} not found`);
  }
}
