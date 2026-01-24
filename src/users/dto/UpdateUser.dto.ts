import { IsOptional, IsString, IsEmail } from "class-validator"
import { ApiPropertyOptional } from "@nestjs/swagger";

export class updateUserDto {
    @ApiPropertyOptional({ description: 'The display name of the user' })
    @IsOptional()
    @IsString()
    displayname?: string;

    @ApiPropertyOptional({ description: 'The email of the user' })
    @IsOptional()
    @IsEmail()
    email?: string;
}
