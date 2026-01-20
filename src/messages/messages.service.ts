import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ConversationsService } from '../conversations/conversations.service';
import { CreateMessageDto } from './create-message.dto';
import { Message, MessageDocument } from 'src/shemas/messages.shema';
import { MessageStatus } from 'src/enums/MessageStatus.enum';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
    private readonly conversationsService: ConversationsService,
  ) {}

  async sendMessage(dto: CreateMessageDto) {
    const message = new this.messageModel({
      conversationId: new Types.ObjectId(dto.conversationId),
      sender: {
        userId: new Types.ObjectId(dto.sender.userId),
        userType: dto.sender.userType,
      },
      content: dto.content,
      status: MessageStatus.SENT, 
    });
    const savedMessage = await message.save();

    await this.conversationsService.updateLastMessage(
      dto.conversationId, 
      savedMessage._id
    );

    return savedMessage;
  }
  async getMessages(conversationId: string) {
    return this.messageModel.find({ conversationId, isDeleted: false }).sort({ createdAt: 1 }); 
  }
}
