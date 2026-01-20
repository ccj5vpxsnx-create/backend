import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
export class PutTicketDto { 
  @IsNotEmpty()
    @IsString()
    title: string;

  @IsNotEmpty()
    @IsString()
    description: string;

  @IsOptional()
    @IsString()
    type?: string;

  @IsOptional()
    @IsString()
    status?: string;

  @IsOptional()
    @IsString()
    category?: string;

  @IsOptional()
    @IsString()
    source?: string;

  @IsOptional()
    @IsString()
    urgency?: string;

  
  @IsOptional()
    @IsString()
    priority?: string;

  @IsOptional()
    @IsString()
    location?: string;
}