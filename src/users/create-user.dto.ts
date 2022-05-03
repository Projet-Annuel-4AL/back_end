import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  readonly id: number;
  readonly firstName: string;
  readonly lastName: string;
  readonly mail: string;
  readonly password: string;
  readonly idAddress: string;
}
