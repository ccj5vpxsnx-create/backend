import { IsOptional, IsString, IsEmail } from "class-validator"

export class updateUserDto {
    @IsOptional()
    @IsString()
    displayname?: string;

    @IsOptional()
    @IsEmail()
    email?: string;
}
