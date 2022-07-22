import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UpdateCollabDto {
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  readonly idGroup?: number;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  readonly idCode?: number;
}
