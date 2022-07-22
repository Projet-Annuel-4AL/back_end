import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCollabDto {
  @IsNumber()
  @IsNotEmpty()
  readonly idGroup: number;

  @IsNumber()
  @IsNotEmpty()
  readonly idCode: number;
}
