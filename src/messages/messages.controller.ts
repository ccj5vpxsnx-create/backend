import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './create-message.dto';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}
  @Post()
  sendMessage(@Body() dto: CreateMessageDto) {
    return this.messagesService.sendMessage(dto);
  }
  @Get(':conversationId')
  getMessages(@Param('conversationId') conversationId: string) {
    return this.messagesService.getMessages(conversationId);
  }
}
