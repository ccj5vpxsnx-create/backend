import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import {
  TicketStatus,
  TicketType,
  TicketPriority,
  TicketUrgency,
  TicketImpact,
  TicketSource,} from '../enums/ticket.enum';
import { Category } from './category.shema';

export type TicketDocument = Ticket & Document;

@Schema({ timestamps: true })
export class Ticket {



  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ enum: TicketType, required: true })
  type: TicketType;

  @Prop({ enum: TicketStatus, default: TicketStatus.NEW })
  status: TicketStatus;

  @Prop({ type: Types.ObjectId, ref: 'Category' })
  category?: Types.ObjectId;

  @Prop({ enum: TicketSource, default: TicketSource.HELPDESK })
  source: TicketSource;

  @Prop({ enum: TicketUrgency, default: TicketUrgency.MEDIUM })
  urgency: TicketUrgency;

  @Prop({ enum: TicketImpact, default: TicketImpact.MEDIUM })
  impact: TicketImpact;

  @Prop({ enum: TicketPriority, default: TicketPriority.MEDIUM })
  priority: TicketPriority;


  @Prop()
  location?: string;


  // Ticket lié (parent ou autre)
  @Prop({ type: Types.ObjectId, ref: 'Ticket' })
  relatedTicket?: Types.ObjectId;


  // Client (demandeur)
  @Prop({ type: Types.ObjectId, ref: 'User' })
  clientId?: Types.ObjectId;

  // Technicien assigné
  @Prop({ type: Types.ObjectId, ref: 'User' })
  technicianId?: Types.ObjectId;
   

  
  // Administrateur assigné
  @Prop({ type: Types.ObjectId, ref: 'User' })
  adminId?: Types.ObjectId;

  // Créateur du ticket (peut être client, admin, système, etc.)
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  requester: Types.ObjectId;



}

export const TicketSchema = SchemaFactory.createForClass(Ticket);

