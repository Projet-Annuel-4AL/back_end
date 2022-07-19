import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePictureDto {
  @IsString()
  @IsNotEmpty()
  dataBuffer: Buffer;

  @IsNotEmpty()
  readonly fileName: string;
}
