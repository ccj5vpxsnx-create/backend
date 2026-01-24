import { IsString, IsNotEmpty, IsOptional, IsEmail } from 'class-validator';

export class PutUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
