import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Photo, PhotoSchema } from './schemas/photo.schema';
import {
  Category,
  CategorySchema,
} from '../categories/schemas/category.schema';
import { PhotosService } from './photos.service';
import { PhotosController } from './photos.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Photo.name, schema: PhotoSchema },
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  providers: [PhotosService],
  controllers: [PhotosController],
})
export class PhotosModule {}
