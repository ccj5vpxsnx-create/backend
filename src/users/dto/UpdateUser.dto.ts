import { IsOptional, IsString } from "class-validator"

export class updateUserDto{
    @IsOptional()
    @IsString()
    displayname?:string
    @IsOptional()
    @IsString()
    email?:string

}