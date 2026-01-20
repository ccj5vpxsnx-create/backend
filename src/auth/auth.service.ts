import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from 'src/shemas/user.shema';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from 'src/mail/email.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
  ) {}
  async login(username: string, password: string) {
    const user = await this.userModel.findOne({ username });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Wrong password');
    }
    const payload = {
      username: user.username,
      sub: user._id,
      type: user.type,
    };
    const access_token = this.jwtService.sign(payload);
    return {
      message: 'Login success',
      access_token,
      user: {
        id: user._id,
        username: user.username,
        type: user.type,
        email: user.email,
      },
    };
  }

  async forgotPassword(email: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
  const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetCode = resetCode;
    await user.save();

    await this.emailService.sendResetCode(email, resetCode);

    return { message: 'Reset code sent to email' };
  }

  async resetPassword(email: string, code: string, newpassword: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    if (user.resetCode !== code) {
      throw new UnauthorizedException('Invalid reset code');
    }
    const hashedPassword = await bcrypt.hash(newpassword, 10);
    user.password = hashedPassword;
    user.resetCode = undefined;
    await user.save();
    return { message: 'Password reset successfully' };
  }
}
