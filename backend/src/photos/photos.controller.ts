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
import { PhotoDto } from './dto/photo.dto';

@Controller('photos')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @Post()
  create(@Body() createPhotoDto: CreatePhotoDto): Promise<PhotoDto> {
    return this.photosService.create(createPhotoDto);
  }

  @Get()
  findAll(): Promise<PhotoDto[]> {
    return this.photosService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<PhotoDto> {
    return this.photosService.findById(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updatePhotoDto: CreatePhotoDto,
  ): Promise<PhotoDto> {
    return this.photosService.update(id, updatePhotoDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<PhotoDto> {
    return this.photosService.delete(id);
  }

  @Post(':id/comments')
  addComment(
    @Param('id') id: string,
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<PhotoDto> {
    return this.photosService.addComment(id, createCommentDto);
  }

  @Get(':id/comments')
  getComments(@Param('id') id: string): Promise<any[]> {
    return this.photosService.getComments(id);
  }
}
