import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateConversationDto } from './create-conversation.dto';
import { Conversation, ConversationDocument } from 'src/shemas/conversation.schema';
import { QueryConversationDto } from './query-conversation.dto';
import { Ticket, TicketDocument } from 'src/shemas/ticket.shema';

@Injectable()
export class ConversationsService {
  constructor(
    @InjectModel(Conversation.name) private conversationModel: Model<ConversationDocument>,
    @InjectModel(Ticket.name) private ticketModel: Model<TicketDocument>,
  ) { }

  async createConversation(dto: CreateConversationDto) {
    let finalParticipants = dto.participants || [];

    // If ticketId is provided, we can automatically add participants (client & technician)
    if (dto.ticketId) {
      const ticket = await this.ticketModel.findById(dto.ticketId);
      if (!ticket) throw new NotFoundException('Ticket not found');

      // Add client and technician to participants if they exist
      const ticketUsers: string[] = [];
      if (ticket.clientId) ticketUsers.push(ticket.clientId.toString());
      if (ticket.technicianId) ticketUsers.push(ticket.technicianId.toString());

      // Merge with existing participants and de-duplicate
      finalParticipants = [...new Set([...finalParticipants, ...ticketUsers])];
    }

    if (finalParticipants.length < 2) {
      throw new ForbiddenException('A conversation must have at least 2 participants');
    }

    const conversation = new this.conversationModel({
      ...dto,
      participants: finalParticipants.map(id => new Types.ObjectId(id)),
      createdBy: new Types.ObjectId(dto.createdBy),
      ticketId: dto.ticketId ? new Types.ObjectId(dto.ticketId) : undefined,
    });
    return conversation.save();
  }

  async getUserConversations(userId: string, query: QueryConversationDto) {
    const { page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const filter = { participants: new Types.ObjectId(userId), isDeleted: false };

    const [items, total] = await Promise.all([
      this.conversationModel
        .find(filter)
        .populate('participants', 'username email type')
        .populate('lastMessage')
        .populate('ticketId')
        .skip(skip)
        .limit(limit)
        .sort({ lastActivity: -1 })
        .exec(),
      this.conversationModel.countDocuments(filter),
    ]);

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
  async updateLastMessage(conversationId: string, messageId: Types.ObjectId) {
    return this.conversationModel.findByIdAndUpdate(
      conversationId,
      { lastMessage: messageId, lastActivity: new Date() },
      { new: true }
    );
  }

  async getConversationByTicketId(ticketId: string) {
    return this.conversationModel
      .find({ ticketId: new Types.ObjectId(ticketId), isDeleted: false })
      .populate('participants', 'username email type')
      .populate('lastMessage')
      .populate('ticketId')
      .exec();
  }
}
