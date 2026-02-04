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
  @IsMongoId()
  _id: string;

  @IsString()
  title: string;

  @IsUrl()
  url: string;

  category: {
    _id?: string;
    name: string;
  };

  @IsDate()
  @Type(() => Date)
  dateOfRealization: Date;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @Type(() => CommentDto)
  comments?: CommentDto[];
}
