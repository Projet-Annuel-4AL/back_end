import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCodeDto {
  @IsString()
  @IsNotEmpty()
  readonly language: string;

  @IsString()
  @IsNotEmpty()
  readonly content: string;
}
