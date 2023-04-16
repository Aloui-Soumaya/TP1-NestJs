import { IsEmail, IsNumber, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class CreateUserDto {
    @IsNumber()
    @IsNotEmpty()
    id: number;
    @IsString()
    @IsNotEmpty()
    username: string;
    @IsEmail()
    @IsNotEmpty()
    email: string;
    @IsStrongPassword()
    @IsNotEmpty()
    password: string;
}
