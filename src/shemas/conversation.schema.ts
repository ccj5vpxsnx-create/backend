import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { ConversationType } from 'src/enums/Conversation-Type.enum';

export type ConversationDocument = Conversation & Document;

@Schema({ timestamps: true })
export class Conversation {
  _id: Types.ObjectId;

  @Prop({ required: true, enum: Object.values(ConversationType) })
  type: ConversationType;

  @Prop()
  name?: string;

  @Prop({ 
    type: [{ 
      userId: { type: Types.ObjectId, required: true },
      userType: { type: String, required: true }
    }], 
    required: true 
  })
  participants: Array<{ userId: Types.ObjectId; userType: string }>;

  @Prop({
    type: { 
      userId: { type: Types.ObjectId, required: true },
      userType: { type: String, required: true }
    },
    required: true
  })
  createdBy: { userId: Types.ObjectId; userType: string };

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
