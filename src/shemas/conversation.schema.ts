import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { ConversationType } from 'src/enums/Conversation-Type.enum';

export type ConversationDocument = Conversation & Document;

@Schema({ timestamps: true })
export class Conversation {
  _id: Types.ObjectId;

  @Prop({ enum: Object.values(ConversationType), required: true })
  type: ConversationType;

  @Prop()
  name?: string;

  @Prop({ type: Types.ObjectId, ref: 'Ticket' })
  ticketId?: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], required: true })
  participants: Types.ObjectId[];

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  createdBy: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Message' })
  lastMessage?: Types.ObjectId;


  @Prop({
    type: {
      icon: { type: String },
      description: { type: String },
    },
  })
  metadata?: {
    icon?: string;
    description?: string;
  };

  @Prop({ type: Date })
  lastActivity?: Date;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  deletedAt: Date;

  @Prop({ default: false })
  isDeleted: boolean;
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);
// Create indexes for better query performance
ConversationSchema.index({ participants: 1 });
ConversationSchema.index({ createdBy: 1 });
