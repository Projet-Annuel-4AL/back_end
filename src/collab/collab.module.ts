import { Module } from '@nestjs/common';
import { CollabController } from './collab.controller';
import { CollabService } from './collab.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Collab } from './collab.entity';
import { GroupsModule } from '../groups/groups.module';
import { CodesModule } from '../posts/post-body/codes/codes.module';

@Module({
  imports: [TypeOrmModule.forFeature([Collab]), GroupsModule, CodesModule],
  controllers: [CollabController],
  providers: [CollabService],
})
export class CollabModule {}
