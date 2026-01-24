import { IsNotEmpty, IsMongoId, IsString, IsOptional } from 'class-validator';

export class CreateMessageDto {
  @IsNotEmpty()
  @IsMongoId()
  conversationId: string;

  @IsOptional()
  @IsMongoId()
  sender?: string;

  @IsNotEmpty()
  @IsString()
  content: string;
}
