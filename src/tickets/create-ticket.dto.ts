import { IsNotEmpty, IsOptional, IsString, IsEnum, IsMongoId, ValidateNested, ValidateIf } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional, ApiHideProperty } from '@nestjs/swagger';
import {
  TicketStatus,
  TicketType,
  TicketPriority,
  TicketUrgency,
  TicketImpact,
  TicketSource,
} from '../enums/ticket.enum';

export class CreateTicketDto {
  @ApiProperty({ description: 'Title of the ticket' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: 'Detailed description of the issue' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ enum: TicketType, description: 'Type of the ticket' })
  @IsNotEmpty()
  @IsEnum(TicketType)
  type: TicketType;

  @ApiPropertyOptional({ enum: TicketStatus, default: TicketStatus.NEW })
  @IsOptional()
  @IsEnum(TicketStatus)
  status?: TicketStatus;

  @ApiPropertyOptional({ description: 'ID of the category' })
  @IsOptional()
  @ValidateIf((o) => o.category !== '')
  @IsMongoId()
  category?: string;

  @ApiPropertyOptional({ enum: TicketSource, default: TicketSource.HELPDESK })
  @IsOptional()
  @IsEnum(TicketSource)
  source?: TicketSource;

  @ApiPropertyOptional({ enum: TicketUrgency, default: TicketUrgency.MEDIUM })
  @IsOptional()
  @IsEnum(TicketUrgency)
  urgency?: TicketUrgency;

  @ApiPropertyOptional({ enum: TicketImpact, default: TicketImpact.MEDIUM })
  @IsOptional()
  @IsEnum(TicketImpact)
  impact?: TicketImpact;

  @ApiPropertyOptional({ enum: TicketPriority, default: TicketPriority.MEDIUM })
  @IsOptional()
  @IsEnum(TicketPriority)
  priority?: TicketPriority;

  @ApiPropertyOptional({ description: 'Location of the issue' })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiPropertyOptional({ description: 'ID of a related ticket' })
  @IsOptional()
  @ValidateIf((o) => o.relatedTicket !== '')
  @IsMongoId()
  relatedTicket?: string;

  @ApiPropertyOptional({ description: 'ID of the client involved (optional, defaults to current user)' })
  @IsOptional()
  @ValidateIf((o) => o.clientId !== '')
  @IsMongoId()
  clientId?: string;

  @ApiPropertyOptional({ description: 'ID of the assigned technician' })
  @IsOptional()
  @ValidateIf((o) => o.technicianId !== '')
  @IsMongoId()
  technicianId?: string;

  @ApiHideProperty()
  @IsOptional()
  @ValidateIf((o) => o.requester !== '')
  @IsMongoId()
  requester?: string;
}

