import { IsArray, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { Types } from 'mongoose';
import { ConversationType } from 'src/enums/Conversation-Type.enum';

export class CreateConversationDto {
  @IsEnum(ConversationType)
  type: ConversationType;

  @IsOptional()
  name?: string;

  @IsArray()
  participants: Array<{ userId: Types.ObjectId; userType: string }>;

  @IsNotEmpty()
  createdBy: { userId: Types.ObjectId; userType: string };
}
