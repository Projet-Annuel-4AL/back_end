import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  SerializeOptions,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users/users.service';
import { JwtAuthGuard } from './auth/jwt-auth-guard';
import { UpdateUserDto } from './users/dto/update-user.dto';

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

  @Get()
  testingHome(): string {
    return 'Api on the moon';
  }

  @Get('users/:mail')
  async getUserByMail(@Param('mail') mail) {
    return this.usersService.findByMail(mail);
  }

  @Get('users/id/:userId')
  async getUserById(@Param('userId') userId) {
    return this.usersService.findByUserId(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':userId')
  async updateUser(
    @Param('userId') userId: number,
    @Body() userUpdate: UpdateUserDto,
  ) {
    return this.usersService.updateUser(userId, userUpdate);
  }
}
