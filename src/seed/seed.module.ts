import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SeedService } from './seed.service';
import { User, UserShema } from '../shemas/user.shema';
import { Category, CategorySchema } from '../shemas/category.shema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserShema },
            { name: Category.name, schema: CategorySchema },
        ]),
    ],
    providers: [SeedService],
})
export class SeedModule { }
