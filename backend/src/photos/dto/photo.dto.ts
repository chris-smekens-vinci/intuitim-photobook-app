import { IsString, IsOptional, IsMongoId } from 'class-validator';
import { Type } from 'class-transformer';
import { CommentDto } from '../../comments/dto/comment.dto';

export class PhotoDto {
  @IsMongoId()
  _id: string;

  @IsString()
  title: string;

  @IsString()
  url: string;

  category: {
    _id?: string;
    name: string;
  };

  @Type(() => Date)
  dateOfRealization: Date;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @Type(() => CommentDto)
  comments?: CommentDto[];
}
