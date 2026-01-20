import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User, UserShema } from 'src/shemas/user.shema';
import { JwtStrategy } from './jwt-strategy';
import { EmailModule } from 'src/mail/email.module';
@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: '123',        
      signOptions: { expiresIn: '1h' },  
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserShema }]),
    EmailModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
