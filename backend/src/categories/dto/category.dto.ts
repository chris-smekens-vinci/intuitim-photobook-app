import { IsString, IsMongoId } from 'class-validator';

export class CategoryDto {
  @IsMongoId()
  _id: string;

  @IsString()
  name: string;
}
