import {
  IsString,
  IsOptional,
  IsUrl,
  IsDate,
  IsMongoId,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CommentDto } from '../../comments/dto/comment.dto';

export class PhotoDto {
  @IsString()
  title: string;

  @IsUrl()
  url: string;

  @IsMongoId()
  @Type(() => String)
  category: {
    name: string;
  };

  @IsDate()
  @Type(() => Date)
  dateOfRealization: Date;

  @IsOptional()
  @IsString()
  description?: string;

  @Type(() => CommentDto)
  comments: CommentDto[];
}
