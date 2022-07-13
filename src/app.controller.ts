import { Controller, Get, Param, SerializeOptions } from '@nestjs/common';
import { UsersService } from './users/users.service';

@Controller('api/')
// @SerializeOptions({
//   strategy: 'excludeAll',
//})
export class AppController {
  constructor(private usersService: UsersService) {}

  @Get('users')
  findAllUser() {
    return this.usersService.getAll();
  }

  @Get('users/:mail')
  async getUserByMail(@Param('mail') mail) {
    return this.usersService.findByMail(mail);
  }

  @Get('users/id/:userId')
  async getUserById(@Param('userId') userId) {
    return this.usersService.findByUserId(userId);
  }
}
