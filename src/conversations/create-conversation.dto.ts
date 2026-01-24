import { IsArray, IsEnum, IsNotEmpty, IsOptional, IsMongoId } from 'class-validator';
import { Types } from 'mongoose';
import { ConversationType } from 'src/enums/Conversation-Type.enum';

export class CreateConversationDto {
  @IsEnum(ConversationType)
  type: ConversationType;

  @IsOptional()
  name?: string;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  participants?: string[];

  @IsOptional()
  @IsMongoId()
  createdBy?: string;

  @IsOptional()
  @IsMongoId()
  ticketId?: string;
}
