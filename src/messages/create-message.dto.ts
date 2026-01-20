import { IsNotEmpty } from 'class-validator';

export class CreateMessageDto {
  @IsNotEmpty()
  conversationId: string; 

  @IsNotEmpty()
  sender: {
    userId: string; 
    userType: string;
  };

  @IsNotEmpty()
  content: string;
}
