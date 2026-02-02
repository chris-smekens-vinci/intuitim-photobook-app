import { IsString, IsOptional, IsUrl } from 'class-validator';

export class CreatePhotoDto {
  @IsString()
  title: string;

  @IsUrl()
  url: string;

  @IsOptional()
  @IsString()
  description?: string;
}
