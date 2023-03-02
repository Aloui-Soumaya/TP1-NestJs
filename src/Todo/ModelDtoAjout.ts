import { Optional } from "@nestjs/common";
import { Type } from "class-transformer";
import { IsIn, IsNumber, IsString, ValidateNested, ValidationArguments } from "class-validator";
import { IsNotEmpty, Length, MinLength } from "class-validator";
import { State } from "src/Status";
import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm";
import { ErrorMsg } from "./ErrorMsg";

export class TodoAddDTO {
    @IsString()
    @IsNotEmpty({
        message: (validationData: ValidationArguments) => {
            return ErrorMsg.EmptyString + `  ==> le champs ${validationData.property} du class ${validationData.targetName} est obligatoire`
        }
    })
    @Length(3, 10, {
        message: (validationData: ValidationArguments) => {
            return ErrorMsg.LengthProblem + `===> le champs ${validationData.property} du class ${validationData.targetName} 
            doit avoir la taille minimale ${validationData.constraints[0]} et la taille maximale ${validationData.constraints[1]}`
        }
    })
    name: string;
    @IsString()
    @IsNotEmpty({
        message: (validationData: ValidationArguments) => {
            return ErrorMsg.EmptyString + ` ==> le champs ${validationData.property} du class ${validationData.targetName} est obligatoire`
        }
    })
    @MinLength(10, {
        message: (validationData: ValidationArguments) => {
            return ErrorMsg.LengthProblem + `===> le champs ${validationData.property} du class ${validationData.targetName} doit avoir la taille minimale ${validationData.constraints[0]}`
        }
    })
    description: string;
    @IsIn([State.actif, State.done, State.waiting])
    status: State;

}