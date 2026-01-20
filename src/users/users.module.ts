import {Module, } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import { User, UserShema } from 'src/shemas/user.shema';
import { UsersService } from './users.service';
import { UserController } from './dto/users.controller';
@Module({
  imports: [MongooseModule.forFeature(
    [{
        name: User.name, 
        schema: UserShema
    }
])
],
providers:[UsersService],
controllers: [UserController],
})
export class UsersModule {}