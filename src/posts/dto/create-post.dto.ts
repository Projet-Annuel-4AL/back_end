import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly createdDate: string;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  readonly idVideo?: number;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  readonly idPicture?: number;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  readonly idCode?: number;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  readonly idText?: number;

  @IsNumber()
  @IsNotEmpty()
  readonly idUser: number;
}
