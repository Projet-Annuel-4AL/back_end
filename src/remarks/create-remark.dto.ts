export class CreateRemarkDto {
  readonly idPost: number;
  readonly idUser: number;
  readonly idParentRemark: number;
  readonly content: string;
}
