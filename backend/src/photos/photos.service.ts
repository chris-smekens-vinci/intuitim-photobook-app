import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Photo, PhotoDocument } from './schemas/photo.schema';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { CreateCommentDto } from '../comments/dto/create-comment.dto';
import { PhotoDto } from './dto/photo.dto';
import { Category } from '../categories/schemas/category.schema';

type CategoryRef = Types.ObjectId | Category;

type PhotoWithCategory = PhotoDocument & {
  category: CategoryRef;
};

function isCategoryPopulated(cat: CategoryRef): cat is Category {
  return typeof cat === 'object' && cat !== null && 'name' in cat;
}

@Injectable()
export class PhotosService {
  constructor(
    @InjectModel(Photo.name) private photoModel: Model<PhotoDocument>,
  ) {}

  async create(createPhotoDto: CreatePhotoDto): Promise<PhotoDto> {
    const createdPhoto = new this.photoModel(createPhotoDto);
    const saved = await createdPhoto.save();
    return this.mapToDto(saved);
  }

  async findAll(
    includeDeleted = false,
    categoryId?: string,
  ): Promise<PhotoDto[]> {
    let query = includeDeleted
      ? this.photoModel.find()
      : this.photoModel.find({
          $or: [{ isDeleted: { $exists: false } }, { isDeleted: false }],
        });

    if (categoryId) {
      query = query.where('category').equals(categoryId);
    }

    const photos = await query.populate('category').exec();
    return photos.map((photo) => this.mapToDto(photo));
  }

  async findById(id: string): Promise<PhotoDto> {
    const photo = await this.photoModel
      .findById(id)
      .populate('category')
      .exec();
    if (!photo) {
      throw new NotFoundException(`Photo with ID ${id} not found`);
    }
    return this.mapToDto(photo);
  }

  async update(id: string, updatePhotoDto: CreatePhotoDto): Promise<PhotoDto> {
    const updated = await this.photoModel
      .findByIdAndUpdate(id, updatePhotoDto, { new: true })
      .populate('category')
      .exec();

    if (!updated) {
      throw new NotFoundException(`Photo with ID ${id} not found`);
    }
    return this.mapToDto(updated);
  }

  async delete(id: string): Promise<PhotoDto> {
    const deleted = await this.photoModel
      .findByIdAndUpdate(id, { isDeleted: true }, { new: true })
      .populate('category')
      .exec();

    if (!deleted) {
      throw new NotFoundException(`Photo with ID ${id} not found`);
    }
    return this.mapToDto(deleted);
  }

  async addComment(
    photoId: string,
    createCommentDto: CreateCommentDto,
  ): Promise<PhotoDto> {
    const comment = {
      content: createCommentDto.content,
      createdAt: new Date(),
    };
    const updated = await this.photoModel
      .findByIdAndUpdate(
        photoId,
        { $push: { comments: comment } },
        { new: true },
      )
      .populate('category')
      .exec();

    if (!updated) {
      throw new NotFoundException(`Photo with ID ${photoId} not found`);
    }
    return this.mapToDto(updated);
  }

  async getComments(photoId: string) {
    const photo = await this.photoModel
      .findById(photoId, { comments: 1 })
      .exec();
    return photo?.comments ?? [];
  }

  private mapToDto(photo: PhotoWithCategory): PhotoDto {
    const cat = photo.category;

    return {
      _id: photo._id.toString(),
      title: photo.title,
      url: photo.url,
      dateOfRealization: photo.dateOfRealization,
      category: {
        name: isCategoryPopulated(cat) ? cat.name : 'Unknown',
      },
      description: photo.description,
      comments: photo.comments ?? [],
    };
  }
}
