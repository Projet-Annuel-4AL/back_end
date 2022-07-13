import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePictureDto {
  @IsString()
  @IsNotEmpty()
  readonly type: string;

  @IsString()
  @IsNotEmpty()
  readonly url: string;
}
