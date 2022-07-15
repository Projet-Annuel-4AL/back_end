import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateRelationGroupPostDto {
  @IsNumber()
  @IsNotEmpty()
  readonly idPost: number;

  @IsNumber()
  @IsNotEmpty()
  readonly idGroup: number;
}
