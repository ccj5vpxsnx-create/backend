import { Body, Controller, Get, Param, Post, Patch, Put, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from '../users.service';
import { CreateUserDto } from './CreateUser.dto';
import { updateUserDto } from './UpdateUser.dto';
import { PutUserDto } from './PutUser.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }
  @Get()
  @UseGuards(JwtAuthGuard)
  getUsers() {
    return this.usersService.getUsers();
  }
  
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  updateUser(@Param('id') id: string, @Body() updateUserDto: updateUserDto) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  replaceUser(@Param('id') id: string, @Body() putUserDto: PutUserDto) {
    return this.usersService.replaceUser(id, putUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}