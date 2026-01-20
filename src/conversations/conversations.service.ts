import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateConversationDto } from './create-conversation.dto';
import { Conversation, ConversationDocument } from 'src/shemas/conversation.schema';

@Injectable()
export class ConversationsService {
  constructor(
    @InjectModel(Conversation.name) private conversationModel: Model<ConversationDocument>,
  ) {}
  async createConversation(dto: CreateConversationDto) {
    const conversation = new this.conversationModel(dto);
    return conversation.save();
  }
  async getUserConversations(userId: string) {
    return this.conversationModel.find({ 'participants.userId': userId, isDeleted: false }).sort({ lastActivity: -1 });
  }
  async updateLastMessage(conversationId: string, messageId: Types.ObjectId) {
    return this.conversationModel.findByIdAndUpdate(
      conversationId,
      { lastMessage: messageId, lastActivity: new Date() },
      { new: true }
    );
  }
}
