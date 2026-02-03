import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { PhotosService } from './photos.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { CreateCommentDto } from '../comments/dto/create-comment.dto';

@Controller('photos')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @Post()
  create(@Body() createPhotoDto: CreatePhotoDto) {
    return this.photosService.create(createPhotoDto);
  }

  @Get()
  findAll() {
    return this.photosService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.photosService.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePhotoDto: CreatePhotoDto) {
    return this.photosService.update(id, updatePhotoDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.photosService.delete(id);
  }

  @Post(':id/comments')
  addComment(
    @Param('id') id: string,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.photosService.addComment(id, createCommentDto);
  }

  @Get(':id/comments')
  getComments(@Param('id') id: string) {
    return this.photosService.getComments(id);
  }
}
