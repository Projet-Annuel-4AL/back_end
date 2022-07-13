import { NotFoundException } from '@nestjs/common';

export class FollowNotFoundByIdException extends NotFoundException {
  constructor(followId: number) {
    super(`Follow with id ${followId} not found`);
  }
}
