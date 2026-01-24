import { IsString, IsNotEmpty, IsOptional, IsEnum, IsMongoId, ValidateIf } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  TicketStatus,
  TicketType,
  TicketPriority,
  TicketUrgency,
  TicketImpact,
  TicketSource,
} from '../enums/ticket.enum';

export class PutTicketDto {
  @ApiPropertyOptional({ description: 'Title of the ticket' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ description: 'Description of the ticket' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ enum: TicketType })
  @IsOptional()
  @IsEnum(TicketType)
  type?: TicketType;

  @ApiPropertyOptional({ enum: TicketStatus })
  @IsOptional()
  @IsEnum(TicketStatus)
  status?: TicketStatus;

  @ApiPropertyOptional({ description: 'Category ID' })
  @IsOptional()
  @ValidateIf((o) => o.category !== '')
  @IsMongoId()
  category?: string;

  @ApiPropertyOptional({ enum: TicketSource })
  @IsOptional()
  @IsEnum(TicketSource)
  source?: TicketSource;

  @ApiPropertyOptional({ enum: TicketUrgency })
  @IsOptional()
  @IsEnum(TicketUrgency)
  urgency?: TicketUrgency;

  @ApiPropertyOptional({ enum: TicketImpact })
  @IsOptional()
  @IsEnum(TicketImpact)
  impact?: TicketImpact;

  @ApiPropertyOptional({ enum: TicketPriority })
  @IsOptional()
  @IsEnum(TicketPriority)
  priority?: TicketPriority;

  @ApiPropertyOptional({ description: 'Location' })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiPropertyOptional({ description: 'Related Ticket ID' })
  @IsOptional()
  @ValidateIf((o) => o.relatedTicket !== '')
  @IsMongoId()
  relatedTicket?: string;

  @ApiPropertyOptional({ description: 'Assigned Technician ID' })
  @IsOptional()
  @ValidateIf((o) => o.technicianId !== '')
  @IsMongoId()
  technicianId?: string;
}
