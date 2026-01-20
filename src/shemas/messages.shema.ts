import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { MessageStatus } from 'src/enums/MessageStatus.enum';

export type MessageDocument = Message & Document;

@Schema({ timestamps: true })
export class Message {

  _id: Types.ObjectId;

  @Prop({ required: true })
  conversationId: Types.ObjectId;

  @Prop({
    type: {
      userId: { type: Types.ObjectId, required: true },
      userType: { type: String, required: true },
    },
    required: true,
  })
  sender: {
    userId: Types.ObjectId;
    userType: string;
  };

  @Prop({ required: true })
  content: string;

  @Prop({
    type: String,
    enum: Object.values(MessageStatus),
    default: MessageStatus.SENT,
  })
  status: MessageStatus;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
