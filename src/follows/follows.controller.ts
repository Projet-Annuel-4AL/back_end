import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { FollowsService } from './follows.service';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';
import { CreateFollowDto } from './create-follow.dto';

@Controller('api/follows')
export class FollowsController {
  constructor(private followersService: FollowsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createFollow(@Body() createFollower: CreateFollowDto) {
    return this.followersService.createFollow(createFollower);
  }

  @Get()
  findAllFollows() {
    return this.followersService.getAll();
  }

  @Get('/:userId')
  async findFollowsByUserId(@Param('userId') userId) {
    return this.followersService.findFollowsByUserId(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:followId')
  async deleteFollowById(@Param('followerId') followerId) {
    return this.followersService.deleteFollowById(followerId);
  }
}
