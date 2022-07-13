import { NotFoundException } from '@nestjs/common';

export class PostNotFoundByIdException extends NotFoundException {
  constructor(postId: number) {
    super(`Post with id ${postId} not found`);
  }
}
