import { IsNotEmpty, IsString } from 'class-validator';
import * as Buffer from 'buffer';

export class CreatePictureDto {
  @IsString()
  @IsNotEmpty()
  dataBuffer: Buffer;

  @IsNotEmpty()
  readonly fileName: string;
}
