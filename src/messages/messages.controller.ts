import { Controller, Post, Body, Get, Param, UseGuards, Req, Query } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './create-message.dto';
import { QueryMessageDto } from './query-message.dto';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('messages')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) { }

  @Post()
  @ApiOperation({ summary: 'Send a new message' })
  sendMessage(@Body() dto: CreateMessageDto, @Req() req) {
    if (!dto.sender) {
      dto.sender = req.user.userId;
    }
    return this.messagesService.sendMessage(dto);
  }

  @Get(':conversationId')
  @ApiOperation({ summary: 'Get messages of a conversation' })
  getMessages(@Param('conversationId') conversationId: string, @Query() query: QueryMessageDto) {
    return this.messagesService.getMessages(conversationId, query);
  }
}
