import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TicketDocument = Ticket & Document;

@Schema({ timestamps: true })
export class Ticket {

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop()
  type?: string;

  @Prop()
  status?: string;

  @Prop()
  category?: string;

  @Prop()
  source?: string;

  @Prop()
  urgency?: string;

  @Prop()
  impact?: string;

  @Prop()
  priority?: string;

  @Prop()
  location?: string;

  @Prop({
    type: {
      userId: { type: Types.ObjectId, required: true },
      userType: { type: String, required: true },
    },
    required: true,
  })
  requester: {
    userId: Types.ObjectId;
    userType: string;
  };
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
