import { IsNotEmpty } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  readonly id: number;
  readonly title: string;
  readonly datePost: Date;
  readonly idContent: string;
  readonly description: string;
  readonly contentType: string;
  readonly idUser: number;
}
