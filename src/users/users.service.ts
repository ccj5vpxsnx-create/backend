import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from 'src/shemas/user.shema';
import { CreateUserDto } from './dto/CreateUser.dto';
import { updateUserDto } from './dto/UpdateUser.dto';
import { PutUserDto } from './dto/PutUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}
  async createUser(createUserDto: CreateUserDto) {
    const userdejafait = await this.userModel.findOne({username: createUserDto.username,});
    if (userdejafait) {
      throw new HttpException( 'Username already exists',  HttpStatus.BAD_REQUEST, ); }
    
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = new this.userModel({
      username: createUserDto.username,
      password: hashedPassword,
      type: createUserDto.type || 'user',
      email: createUserDto.email, 
    });
    return await newUser.save();
  }
  async getUsers() {
    return await this.userModel.find().select('-password');
  }
  async getUserById(id: string) {
    const user = await this.userModel.findById(id).select('-password');
    return user;
  }

  async updateUser(id: string, updateUserDto: updateUserDto) {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      id, 
      updateUserDto, { new: true }).select('-password');
    return updatedUser;
  }

  async replaceUser(id: string, putUserDto: PutUserDto) {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND); }  
    user.username = putUserDto.username;
    user.email = putUserDto.email;
    user.type = putUserDto.type || 'user';
    user.password = putUserDto.password;

    return await user.save();}

  async deleteUser(id: string) {
    const deletedUser = await this.userModel.findByIdAndDelete(id);
    return { message: 'User deleted successfully' };
  }
}