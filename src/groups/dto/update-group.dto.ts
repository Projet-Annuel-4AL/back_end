import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateGroupDto {
  @IsString()
  @IsOptional()
  readonly name?: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  readonly description?: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  readonly theme?: string;
}
