import { Controller, Post, Body, Get, Param, UseGuards, Req, Query } from '@nestjs/common';
import { ConversationsService } from './conversations.service';
import { CreateConversationDto } from './create-conversation.dto';
import { QueryConversationDto } from './query-conversation.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('conversations')
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) { }

  @Post()
  createConversation(@Body() dto: CreateConversationDto, @Req() req) {
    if (!dto.createdBy) {
      dto.createdBy = req.user.userId;
    }
    return this.conversationsService.createConversation(dto);
  }

  @Get('/my')
  getMyConversations(@Query() query: QueryConversationDto, @Req() req) {
    return this.conversationsService.getUserConversations(req.user.userId, query);
  }

  @Get('/ticket/:ticketId')
  getConversationByTicketId(@Param('ticketId') ticketId: string) {
    return this.conversationsService.getConversationByTicketId(ticketId);
  }
}
