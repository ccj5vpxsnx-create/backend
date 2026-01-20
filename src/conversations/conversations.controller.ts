import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ConversationsService } from './conversations.service';
import { CreateConversationDto } from './create-conversation.dto';

@Controller('conversations')
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}

  @Post()
  createConversation(@Body() dto: CreateConversationDto) {
    return this.conversationsService.createConversation(dto);
  }

  @Get('/:userId')
  getUserConversations(@Param('userId') userId: string) {
    return this.conversationsService.getUserConversations(userId);
  }
}
