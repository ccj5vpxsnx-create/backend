import { IsArray, IsEnum, IsNotEmpty, IsOptional, IsMongoId } from 'class-validator';
import { Types } from 'mongoose';
import { ConversationType } from 'src/enums/Conversation-Type.enum';
import { ApiProperty, ApiPropertyOptional, ApiHideProperty } from '@nestjs/swagger';

export class CreateConversationDto {
  @ApiProperty({ enum: ConversationType, description: 'Type of conversation' })
  @IsEnum(ConversationType)
  type: ConversationType;

  @ApiPropertyOptional({ description: 'Name of the conversation (for group chats)' })
  @IsOptional()
  name?: string;

  @ApiHideProperty()
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  participants?: string[];

  @ApiHideProperty()
  @IsOptional()
  @IsMongoId()
  createdBy?: string;

  @ApiPropertyOptional({ description: 'ID of the related ticket' })
  @IsOptional()
  @IsMongoId()
  ticketId?: string;
}
