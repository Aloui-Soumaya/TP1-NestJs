import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateCvDto {
    @IsOptional()
    @IsString()
    name: string;
    @IsOptional()
    @IsString()
    firstname: string;
    @IsOptional()
    @IsNumber()
    age: number;
    @IsOptional()
    @IsString()
    path: string;
    @IsOptional()
    @IsString()
    job: string;
    @IsOptional()
    @IsString()
    cin: number;

}