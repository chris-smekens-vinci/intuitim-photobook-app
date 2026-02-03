import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Photo, PhotoDocument } from './schemas/photo.schema';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { CreateCommentDto } from '../comments/dto/create-comment.dto';

@Injectable()
export class PhotosService {
  constructor(
    @InjectModel(Photo.name) private photoModel: Model<PhotoDocument>,
  ) {}

  async create(createPhotoDto: CreatePhotoDto): Promise<PhotoDocument> {
    const createdPhoto = new this.photoModel(createPhotoDto);
    return createdPhoto.save();
  }

  async findAll(): Promise<PhotoDocument[]> {
    return this.photoModel.find().exec();
  }

  async findById(id: string): Promise<PhotoDocument | null> {
    return this.photoModel.findById(id).exec();
  }

  async update(
    id: string,
    updatePhotoDto: CreatePhotoDto,
  ): Promise<PhotoDocument | null> {
    return this.photoModel
      .findByIdAndUpdate(id, updatePhotoDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<PhotoDocument | null> {
    return this.photoModel.findByIdAndDelete(id).exec();
  }

  async addComment(
    photoId: string,
    createCommentDto: CreateCommentDto,
  ): Promise<PhotoDocument | null> {
    const comment = {
      content: createCommentDto.content,
      createdAt: new Date(),
    };
    return this.photoModel
      .findByIdAndUpdate(
        photoId,
        { $push: { comments: comment } },
        { new: true },
      )
      .exec();
  }

  async getComments(photoId: string) {
    const photo = await this.photoModel
      .findById(photoId, { comments: 1 })
      .exec();
    return photo?.comments ?? [];
  }
}
