import { Controller, Post, Body, Get, Param, Delete, Put, UseGuards, Req, Query, } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './create-ticket.dto';
import { PutTicketDto } from './PutTicket.dto';
import { QueryTicketDto } from './query-ticket.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('tickets')
export class TicketsController {
    constructor(private readonly ticketsService: TicketsService) { }

    @Post()
    create(@Body() createTicketDto: CreateTicketDto, @Req() req) {
        // requester is always the person logged in (unless explicitly overridden by admin)
        if (!createTicketDto.requester) {
            createTicketDto.requester = req.user.userId;
        }

        // Logic for clientId:
        // 1. If it's a regular user ('user' or 'client'), we force THEM as the clientId
        if (req.user.type === 'user' || req.user.type === 'client') {
            createTicketDto.clientId = req.user.userId;
        }
        // 2. If it's an Admin/Technician, we only assign them as clientId if they left it blank
        // (This allows Admin to create a ticket without any client ID if they want)
        else if (!createTicketDto.clientId && req.user.type !== 'admin' && req.user.type !== 'superadmin') {
            createTicketDto.clientId = req.user.userId;
        }

        return this.ticketsService.createTicket(createTicketDto);
    }

    @Get()
    findAll(@Query() query: QueryTicketDto, @Req() req) {
        return this.ticketsService.findAll(query, req.user.userId, req.user.type);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.ticketsService.findOne(id);
    }

    @Delete(':id')
    deleteTicket(@Param('id') id: string) {
        return this.ticketsService.deleteTicket(id);
    }

    @Put(':id')
    replaceTicket(@Param('id') id: string, @Body() putTicketDto: PutTicketDto,) {
        return this.ticketsService.replaceTicket(id, putTicketDto);
    }
}
