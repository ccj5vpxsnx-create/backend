import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from 'src/shemas/user.shema';
import { CreateUserDto } from './dto/CreateUser.dto';
import { updateUserDto } from './dto/UpdateUser.dto';
import { PutUserDto } from './dto/PutUser.dto';
import { QueryUserDto } from './dto/QueryUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) { }
  async createUser(createUserDto: CreateUserDto) {
    const userdejafait = await this.userModel.findOne({ username: createUserDto.username, });
    if (userdejafait) {
      throw new HttpException('Username already exists', HttpStatus.BAD_REQUEST,);
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = new this.userModel({
      username: createUserDto.username,
      password: hashedPassword,
      type: createUserDto.type || 'user',
      email: createUserDto.email,
    });
    return await newUser.save();
  }
  async getUsers(query: QueryUserDto) {
    const { page = 1, limit = 10, type, search } = query;
    const skip = (page - 1) * limit;

    const filter: any = {};
    if (type) filter.type = type;
    if (search) {
      filter.$or = [
        { username: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const [items, total] = await Promise.all([
      this.userModel
        .find(filter)
        .select('-password')
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .exec(),
      this.userModel.countDocuments(filter),
    ]);

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
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
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    user.username = putUserDto.username;
    user.email = putUserDto.email;
    user.type = putUserDto.type || 'user';
    user.password = putUserDto.password;

    return await user.save();
  }

  async deleteUser(id: string) {
    const deletedUser = await this.userModel.findByIdAndDelete(id);
    return { message: 'User deleted successfully' };
  }
}