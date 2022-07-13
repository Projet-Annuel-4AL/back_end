import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateGroupDto {
  readonly name: string;
  @IsString()
  @IsNotEmpty()
  readonly theme: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  readonly idGroupOwner: number;
}
