import { IsString, IsNotEmpty, IsOptional, IsEnum, IsMongoId, ValidateIf } from 'class-validator';
import {
  TicketStatus,
  TicketType,
  TicketPriority,
  TicketUrgency,
  TicketImpact,
  TicketSource,
} from '../enums/ticket.enum';

export class PutTicketDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(TicketType)
  type?: TicketType;

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
  @ValidateIf((o) => o.technicianId !== '')
  @IsMongoId()
  technicianId?: string;

  @IsOptional()
  @ValidateIf((o) => o.adminId !== '')
  @IsMongoId()
  adminId?: string;
}
