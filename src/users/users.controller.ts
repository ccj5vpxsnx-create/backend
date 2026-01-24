import { Body, Controller, Get, Param, Post, Patch, Put, Delete, UseGuards, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/CreateUser.dto';
import { updateUserDto } from './dto/UpdateUser.dto';
import { PutUserDto } from './dto/PutUser.dto';
import { QueryUserDto } from './dto/QueryUser.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @ApiOperation({ summary: 'Register a new user' })
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all users (Requires Token)' })
  getUsers(@Query() query: QueryUserDto) {
    return this.usersService.getUsers(query);
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get user by ID (Requires Token)' })
  getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update user partially (Requires Token)' })
  updateUser(@Param('id') id: string, @Body() updateUserDto: updateUserDto) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Replace user (Requires Token)' })
  replaceUser(@Param('id') id: string, @Body() putUserDto: PutUserDto) {
    return this.usersService.replaceUser(id, putUserDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete user (Requires Token)' })
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
