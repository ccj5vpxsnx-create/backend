import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Ticket, TicketDocument } from 'src/shemas/ticket.shema';
import { CreateTicketDto } from './create-ticket.dto';
import { PutTicketDto } from './PutTicket.dto';

@Injectable()
export class TicketsService {
  constructor(
    @InjectModel(Ticket.name)
    private ticketModel: Model<TicketDocument>,
  ) {}
  async createTicket(createTicketDto: CreateTicketDto) {
    const ticketExiste = await this.ticketModel.findOne({
      title: createTicketDto.title,
    });
    if (ticketExiste) {
      throw new HttpException('Ticket already exists', HttpStatus.BAD_REQUEST,  ); }

    const ticket = new this.ticketModel({
      title: createTicketDto.title,
      description: createTicketDto.description,
      type: createTicketDto.type,
      status: createTicketDto.status,
      category: createTicketDto.category,
      source: createTicketDto.source,
      urgency: createTicketDto.urgency,
      impact: createTicketDto.impact,
      priority: createTicketDto.priority,
      location: createTicketDto.location,
      requester: {
        userId: new Types.ObjectId(createTicketDto.requester.userId),
        userType: createTicketDto.requester.userType,
      },
    });

    return await ticket.save();
  }
  async findAll() {
    return this.ticketModel.find().exec();
  }
  async findOne(id: string) {
    return this.ticketModel.findById(id).exec();
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

    ticket.title = dto.title;
    ticket.description = dto.description;
    ticket.type = dto.type;
    ticket.status = dto.status;
    ticket.category = dto.category;
    ticket.source = dto.source;
    ticket.urgency = dto.urgency;
    ticket.priority = dto.priority;
    ticket.location = dto.location;

    return await ticket.save();
  }
}
