import { IsNotEmpty, IsMongoId, IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional, ApiHideProperty } from '@nestjs/swagger';

export class CreateMessageDto {
  @ApiProperty({ description: 'ID of the conversation' })
  @IsNotEmpty()
  @IsMongoId()
  conversationId: string;

  @ApiHideProperty()
  @IsOptional()
  @IsMongoId()
  sender?: string;

  @ApiProperty({ description: 'Content of the message' })
  @IsNotEmpty()
  @IsString()
  content: string;
}
