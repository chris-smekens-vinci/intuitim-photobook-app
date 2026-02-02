import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Category } from '../../categories/schemas/category.schema';

export type PhotoDocument = HydratedDocument<Photo>;

@Schema({ timestamps: true })
export class Photo {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  url: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: Category.name,
  })
  category: mongoose.Types.ObjectId;

  @Prop({ required: true })
  dateOfRealization: Date; // realization date of the photo

  @Prop()
  description?: string;

  @Prop({ default: false })
  isDeleted: boolean;
}

export const PhotoSchema = SchemaFactory.createForClass(Photo);
