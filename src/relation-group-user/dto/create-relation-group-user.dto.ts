import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateRelationGroupUserDto {
  @IsNumber()
  @IsNotEmpty()
  readonly idUser: number;

  @IsNumber()
  @IsNotEmpty()
  readonly idGroup: number;
}
