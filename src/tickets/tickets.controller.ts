import {Controller,Post,Body,Get, Param, Delete, Put,} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './create-ticket.dto';
import { PutTicketDto } from './PutTicket.dto';

@Controller('tickets')
export class TicketsController {
    constructor(private readonly ticketsService: TicketsService) { }

    @Post()
    create(@Body() createTicketDto: CreateTicketDto) {
        return this.ticketsService.createTicket(createTicketDto);}
    @Get()
    findAll() {
        return this.ticketsService.findAll();}
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.ticketsService.findOne(id);}
    @Delete(':id')
    deleteTicket(@Param('id') id: string) {
        return this.ticketsService.deleteTicket(id);
    }
    @Put(':id')
    replaceTicket(@Param('id') id: string,@Body() putTicketDto: PutTicketDto,) {
        return this.ticketsService.replaceTicket(id, putTicketDto);
    }
}
