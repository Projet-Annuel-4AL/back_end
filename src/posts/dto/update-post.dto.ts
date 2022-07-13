import { UpdateTextDto } from '../post-body/texts/dto/update-text.dto';
import { UpdateCodeDto } from '../post-body/codes/dto/update-code.dto';
import { UpdateTitlePostDto } from './update-title-post.dto';

export class UpdatePostDto {
  readonly title?: UpdateTitlePostDto;
  readonly text?: UpdateTextDto;
  readonly code?: UpdateCodeDto;
}
