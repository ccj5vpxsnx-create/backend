import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConversationsModule } from './conversations/conversations.module';
import { MessagesModule } from './messages/messages.module';
import { TicketsModule } from './tickets/tickets.module';
import { CategoriesModule } from './categories/categories.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1/projet'),
    UsersModule,
    AuthModule,
    ConversationsModule,
    MessagesModule,
    TicketsModule,
    CategoriesModule,
    SeedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
