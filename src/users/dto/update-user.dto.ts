import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly firstName?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly lastName?: string;

  @IsEmail()
  @IsNotEmpty()
  @IsOptional()
  readonly mail?: string;

  @IsString()
  @IsOptional()
  readonly idAddress?: string;
}
