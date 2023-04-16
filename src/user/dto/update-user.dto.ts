import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
    @IsNumber()
    @IsOptional()
    id: number;
    @IsString()
    @IsOptional()
    username: string;
    @IsEmail()
    @IsOptional()
    email: string;
    @IsString()
    @IsOptional()
    password: string;
}
