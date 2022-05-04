export class CreatePostDto {
  readonly title: string;
  readonly datePost: Date;
  readonly idContent: number;
  readonly description: string;
  readonly contentType: string;
  readonly idUser: number;
}
