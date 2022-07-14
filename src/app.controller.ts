import {
  Post,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Req,
  SerializeOptions,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users/users.service';
import { JwtAuthGuard } from './auth/jwt-auth-guard';
import { UpdateUserDto } from './users/dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import RequestWithUser from './auth/request-whit-user.interface';
import { Express } from 'express';
import { CreatePictureDto } from './posts/post-body/pictures/dto/create-picture.dto';

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

  @UseGuards(JwtAuthGuard)
  @Patch(':userId')
  async updateUser(
    @Param('userId') userId: number,
    @Body() userUpdate: UpdateUserDto,
  ) {
    return this.usersService.updateUser(userId, userUpdate);
  }

  @Post('users/avatar')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async addAvatar(
    @Req() request: RequestWithUser,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const pictureCreate: CreatePictureDto = {
      dataBuffer: file.buffer,
      fileName: file.originalname,
    };
    return this.usersService.addAvatar(request.user.id, pictureCreate);
  }
}
