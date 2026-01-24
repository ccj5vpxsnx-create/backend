import { IsOptional, IsEnum, IsString, IsInt, Min, Max, IsMongoId } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { TicketStatus, TicketType, TicketPriority } from '../enums/ticket.enum';

export class QueryTicketDto {
    @ApiPropertyOptional({ description: 'Page number', default: 1 })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page?: number = 1;

    @ApiPropertyOptional({ description: 'Items per page', default: 10 })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(100)
    limit?: number = 10;

    @ApiPropertyOptional({ enum: TicketStatus })
    @IsOptional()
    @IsEnum(TicketStatus)
    status?: TicketStatus;

    @ApiPropertyOptional({ enum: TicketType })
    @IsOptional()
    @IsEnum(TicketType)
    type?: TicketType;

    @ApiPropertyOptional({ enum: TicketPriority })
    @IsOptional()
    @IsEnum(TicketPriority)
    priority?: TicketPriority;

    @ApiPropertyOptional({ description: 'Filter by category ID' })
    @IsOptional()
    @IsMongoId()
    category?: string;

    @ApiPropertyOptional({ description: 'Filter by technician ID' })
    @IsOptional()
    @IsMongoId()
    technicianId?: string;

    @ApiPropertyOptional({ description: 'Filter by client ID' })
    @IsOptional()
    @IsMongoId()
    clientId?: string;

    @ApiPropertyOptional({ description: 'Filter by title or description' })
    @IsOptional()
    @IsString()
    search?: string;
}
