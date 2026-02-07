import { IsNotEmpty, IsOptional, IsString, IsEnum, IsMongoId, ValidateNested, ValidateIf } from 'class-validator';
import { Type } from 'class-transformer';
import {
  TicketStatus,
  TicketType,
  TicketPriority,
  TicketUrgency,
  TicketImpact,
  TicketSource,
} from '../enums/ticket.enum';

export class CreateTicketDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsEnum(TicketType)
  type: TicketType;

  @IsOptional()
  @IsEnum(TicketStatus)
  status?: TicketStatus;

  @IsOptional()
  @ValidateIf((o) => o.category !== '')
  @IsMongoId()
  category?: string;

  @IsOptional()
  @IsEnum(TicketSource)
  source?: TicketSource;

  @IsOptional()
  @IsEnum(TicketUrgency)
  urgency?: TicketUrgency;

  @IsOptional()
  @IsEnum(TicketImpact)
  impact?: TicketImpact;

  @IsOptional()
  @IsEnum(TicketPriority)
  priority?: TicketPriority;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @ValidateIf((o) => o.relatedTicket !== '')
  @IsMongoId()
  relatedTicket?: string;

  @IsOptional()
  @ValidateIf((o) => o.clientId !== '')
  @IsMongoId()
  clientId?: string;

  @IsOptional()
  @ValidateIf((o) => o.technicianId !== '')
  @IsMongoId()
  technicianId?: string;
   
  @IsOptional()
  @ValidateIf((o) => o.adminId !== '')
  @IsMongoId()
  adminId?: string;

  @IsOptional()
  @ValidateIf((o) => o.requester !== '')
  @IsMongoId()
  requester?: string;
}

