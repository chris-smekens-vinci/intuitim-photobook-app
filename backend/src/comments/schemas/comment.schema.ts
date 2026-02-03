import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Comment {
  @Prop({ required: true })
  content: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}
export const CommentSchema = SchemaFactory.createForClass(Comment);
