import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop()
  displayname?: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    enum: ['superadmin', 'admin', 'technician', 'user'],
    default: 'user',
  })
  type: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  age?: string;

  @Prop({ index: true })
  resetCode?: string;
}

export const UserShema = SchemaFactory.createForClass(User);
