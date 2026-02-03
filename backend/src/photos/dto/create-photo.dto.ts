import {
  IsString,
  IsOptional,
  IsUrl,
  IsDate,
  IsMongoId,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePhotoDto {
  @IsString()
  title: string;

  @IsUrl()
  url: string;

  @IsMongoId()
  category: string;

  @Type(() => Date) // Transform input JSON to Date object
  @IsDate()
  dateOfRealization: Date;

  @IsOptional()
  @IsString()
  description?: string;
}
