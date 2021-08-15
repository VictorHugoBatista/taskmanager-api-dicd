import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema()
export class Task {
  @Prop()
  id?: string;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop({ default: false })
  isDone?: boolean;

  @Prop({ default: new Date() })
  createdAt?: Date;

  @Prop({ default: null })
  updatedAt?: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
