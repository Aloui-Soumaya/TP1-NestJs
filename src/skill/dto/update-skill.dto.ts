import { PartialType } from '@nestjs/mapped-types';
import { CreateSkillDto } from './create-skill.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateSkillDto {
    @IsOptional()
    @IsString()
    designation: string;
}
