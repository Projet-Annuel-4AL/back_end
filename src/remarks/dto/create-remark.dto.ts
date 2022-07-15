import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateRemarkDto {
  @IsNumber()
  @IsNotEmpty()
  readonly idPost: number;

  @IsNumber()
  @IsNotEmpty()
  readonly idUser: number;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  readonly idParentRemark?: number;

  @IsString()
  @IsNotEmpty()
  readonly content: string;
}
