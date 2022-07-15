import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateLikeDto {
  @IsNumber()
  @IsNotEmpty()
  readonly idUser: number;

  @IsNumber()
  @IsNotEmpty()
  readonly idPost: number;
}
