import { IsOptional, IsEnum, IsString, IsInt, Min, Max, IsMongoId } from 'class-validator';
import { Type } from 'class-transformer';
import { TicketStatus, TicketType, TicketPriority } from '../enums/ticket.enum';

export class QueryTicketDto {
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page?: number = 1;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(100)
    limit?: number = 10;

    @IsOptional()
    @IsEnum(TicketStatus)
    status?: TicketStatus;

    @IsOptional()
    @IsEnum(TicketType)
    type?: TicketType;

    @IsOptional()
    @IsEnum(TicketPriority)
    priority?: TicketPriority;

    @IsOptional()
    @IsMongoId()
    category?: string;

    @IsOptional()
    @IsMongoId()
    technicianId?: string;

    @IsOptional()
    @IsMongoId()
    clientId?: string;

    @IsOptional()
    @IsString()
    search?: string;
}
