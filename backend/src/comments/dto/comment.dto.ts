import { IsString, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CommentDto {
  @IsString()
  content: string;

  @IsDate()
  @Type(() => Date)
  createdAt: Date;
}
