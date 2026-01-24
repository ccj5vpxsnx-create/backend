import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Ticket, TicketDocument } from 'src/shemas/ticket.shema';
import { CreateTicketDto } from './create-ticket.dto';
import { PutTicketDto } from './PutTicket.dto';
import { QueryTicketDto } from './query-ticket.dto';

@Injectable()
export class TicketsService {
  constructor(
    @InjectModel(Ticket.name)
    private ticketModel: Model<TicketDocument>,
  ) { }
  async createTicket(createTicketDto: CreateTicketDto) {
    const ticketExiste = await this.ticketModel.findOne({
      title: createTicketDto.title,
    });
    if (ticketExiste) {
      throw new HttpException('Ticket already exists', HttpStatus.BAD_REQUEST,);
    }

    const ticket = new this.ticketModel({
      title: createTicketDto.title,
      description: createTicketDto.description,
      type: createTicketDto.type,
      status: createTicketDto.status,
      category: createTicketDto.category ? new Types.ObjectId(createTicketDto.category) : undefined,
      source: createTicketDto.source,
      urgency: createTicketDto.urgency,
      impact: createTicketDto.impact,
      priority: createTicketDto.priority,
      location: createTicketDto.location,
      relatedTicket: createTicketDto.relatedTicket ? new Types.ObjectId(createTicketDto.relatedTicket) : undefined,
      clientId: new Types.ObjectId(createTicketDto.clientId),
      technicianId: createTicketDto.technicianId ? new Types.ObjectId(createTicketDto.technicianId) : undefined,
      requester: createTicketDto.requester ? new Types.ObjectId(createTicketDto.requester) : new Types.ObjectId(createTicketDto.clientId),
    });

    return await ticket.save();
  }

  async findAll(query: QueryTicketDto, userId?: string, userType?: string) {
    const { page = 1, limit = 10, status, type, priority, category, search } = query;
    const skip = (page - 1) * limit;

    const filter: any = {};

    // Base filters based on role
    if (userType === 'technician') {
      filter.technicianId = new Types.ObjectId(userId);
    } else if (userType === 'user' || userType === 'client') {
      filter.$or = [
        { clientId: new Types.ObjectId(userId) },
        { requester: new Types.ObjectId(userId) }
      ];
    }

    // Additional filters from query
    if (status) filter.status = status;
    if (type) filter.type = type;
    if (priority) filter.priority = priority;
    if (category) filter.category = new Types.ObjectId(category);

    // Only apply these if not already restricted by role
    if (query.technicianId && !filter.technicianId) {
      filter.technicianId = new Types.ObjectId(query.technicianId);
    }
    if (query.clientId && !filter.clientId && !filter.$or) {
      filter.clientId = new Types.ObjectId(query.clientId);
    }

    if (search) {
      filter.$or = filter.$or || [];
      filter.$or.push(
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      );
    }

    const [items, total] = await Promise.all([
      this.ticketModel
        .find(filter)
        .populate('category')
        .populate('clientId', 'username email')
        .populate('technicianId', 'username email')
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .exec(),
      this.ticketModel.countDocuments(filter),
    ]);

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
  async findOne(id: string) {
    return this.ticketModel
      .findById(id)
      .populate('category')
      .populate('clientId', 'username email')
      .populate('technicianId', 'username email')
      .populate('requester', 'username email')
      .populate('relatedTicket')
      .exec();
  }

  async deleteTicket(id: string) {
    const ticket = await this.ticketModel.findByIdAndDelete(id);

    if (!ticket) {
      throw new HttpException('Ticket not found', HttpStatus.NOT_FOUND);
    }

    return { message: 'Ticket deleted successfully' };
  }

  async replaceTicket(id: string, dto: PutTicketDto) {
    const ticket = await this.ticketModel.findById(id);

    if (!ticket) {
      throw new HttpException('Ticket not found', HttpStatus.NOT_FOUND);
    }

    if (dto.title) ticket.title = dto.title;
    if (dto.description) ticket.description = dto.description;
    if (dto.type) ticket.type = dto.type;
    if (dto.status) ticket.status = dto.status;
    if (dto.category) ticket.category = new Types.ObjectId(dto.category);
    if (dto.source) ticket.source = dto.source;
    if (dto.urgency) ticket.urgency = dto.urgency;
    if (dto.impact) ticket.impact = dto.impact;
    if (dto.priority) ticket.priority = dto.priority;
    if (dto.location) ticket.location = dto.location;

    if (dto.relatedTicket) {
      ticket.relatedTicket = new Types.ObjectId(dto.relatedTicket);
    }

    if (dto.technicianId) {
      ticket.technicianId = new Types.ObjectId(dto.technicianId);
    }

    return await ticket.save();
  }
}
