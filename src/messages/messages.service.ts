import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ConversationsService } from '../conversations/conversations.service';
import { CreateMessageDto } from './create-message.dto';
import { Message, MessageDocument } from 'src/shemas/messages.shema';
import { MessageStatus } from 'src/enums/MessageStatus.enum';
import { QueryMessageDto } from './query-message.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
    private readonly conversationsService: ConversationsService,
  ) { }

  async sendMessage(dto: CreateMessageDto) {
    const message = new this.messageModel({
      conversationId: new Types.ObjectId(dto.conversationId),
      sender: new Types.ObjectId(dto.sender),
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
  async getMessages(conversationId: string, query: QueryMessageDto) {
    const { page = 1, limit = 50 } = query;
    const skip = (page - 1) * limit;

    const filter = { conversationId: new Types.ObjectId(conversationId) };

    const [items, total] = await Promise.all([
      this.messageModel
        .find(filter)
        .populate('sender', 'username email type')
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: 1 })
        .exec(),
      this.messageModel.countDocuments(filter),
    ]);

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}
