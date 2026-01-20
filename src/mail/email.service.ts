import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'sarahsaroursarour@gmail.com',
        pass: 'uaqx kyrg qtxx dhtc',
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  async sendResetCode(email: string, code: string) {
    try {
      const info = await this.transporter.sendMail({
        from: '"Support" <sarahsaroursarour@gmail.com>',
        to: email,
        subject: 'Reset Password Code',
        text: `Your reset code is: ${code}`,
        html: `<p>Your reset code is: <strong>${code}</strong></p>`,
      });

      return info;
    } catch (error) {
      throw new InternalServerErrorException( `Failed to send email: ${error.message}`,);
    }
  }
}
