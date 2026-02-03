import { IsString, Matches } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @Matches(/.*[.!?]$/, {
    message: 'Le commentaire doit se terminer par un ".", "?" ou "!"',
  })
  content: string;
}
