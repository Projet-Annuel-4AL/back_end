import { Module } from '@nestjs/common';
import { RelationGroupPostService } from './relation-group-post.service';
import { RelationGroupPostController } from './relation-group-post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RelationGroupPost } from './relation-group-post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RelationGroupPost])],
  providers: [RelationGroupPostService],
  controllers: [RelationGroupPostController],
})
export class RelationGroupPostModule {}
