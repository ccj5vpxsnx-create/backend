import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class PutUserDto {
  @IsString()
    @IsNotEmpty()
    username: string;
  
   
    @IsString()
    @IsNotEmpty()
    password: string;
  
    @IsString()
    @IsOptional()
    type?: string;
    @IsString()
    @IsNotEmpty()
    email: string; 
}
