import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;

@Schema()
export class Category {
  // Define a 'name' property that is required and unique.
  @Prop({ required: true, unique: true })
  name: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
