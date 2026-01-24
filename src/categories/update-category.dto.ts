import { IsString, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCategoryDto {
    @ApiPropertyOptional({ description: 'New name of the category' })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiPropertyOptional({ description: 'New description of the category' })
    @IsOptional()
    @IsString()
    description?: string;
}
