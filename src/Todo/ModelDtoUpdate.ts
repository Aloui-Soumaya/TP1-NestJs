import { IsIn, IsOptional } from "class-validator";
import { TodoAddDTO } from "./ModelDtoAjout";
import { State } from "./Status";
import { PartialType } from "@nestjs/mapped-types";

export class TodoUpdate extends PartialType(TodoAddDTO) {
    @IsOptional()
    @IsIn([State.actif, State.done, State.waiting])
    status: State;
}