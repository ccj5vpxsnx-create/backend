import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ResetPasswordDto {
    @ApiProperty({ example: 'admin@example.com' })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ example: '123456' })
    @IsNotEmpty()
    @IsString()
    code: string;

    @ApiProperty({ example: 'newpassword123' })
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    newpassword: string;
}
