import { Module } from '@nestjs/common';
import { RelationGroupUserService } from './relation-group-user.service';
import { RelationGroupUserController } from './relation-group-user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RelationGroupUser } from './relation-group-user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RelationGroupUser])],
  providers: [RelationGroupUserService],
  controllers: [RelationGroupUserController],
})
export class RelationGroupUserModule {}
