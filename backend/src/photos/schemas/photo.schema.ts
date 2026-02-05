import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Category } from '../../categories/schemas/category.schema';
import { Comment, CommentSchema } from '../../comments/schemas/comment.schema';

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
  dateOfRealization: Date;

  @Prop()
  description?: string;

  @Prop({ type: [CommentSchema], default: [] })
  comments: Comment[];

  @Prop({ default: false })
  isDeleted: boolean;
}

export const PhotoSchema = SchemaFactory.createForClass(Photo);
