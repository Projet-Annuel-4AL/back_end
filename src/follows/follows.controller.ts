import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
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
  findAllFollows(
    @Query('idUserFollowing') idUserFollowing?: number,
    @Query('idUserFollowed') idUserFollowed?: number,
  ) {
    if (
      this.isNotEmptyParam(idUserFollowing) &&
      this.isNotEmptyParam(idUserFollowed)
    ) {
      return this.followersService.findFollowByIdUserFollowingdAndIdUserFollower(
        idUserFollowing,
        idUserFollowed,
      );
    }
    return this.followersService.getAll();
  }

  isNotEmptyParam(param: number): boolean {
    return param != null;
  }

  @Get('/:userId')
  async findFollowsByUserId(@Param('userId') userId) {
    return this.followersService.findFollowsByUserId(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:followId')
  async deleteFollowById(@Param('followId') followId) {
    return this.followersService.deleteFollowById(followId);
  }
}
