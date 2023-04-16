import { IsIn, IsOptional } from "class-validator";
import { State } from "./Status";

export class ParamDto {

    @IsOptional()
    data: string;

    @IsOptional()
    @IsIn([State.actif, State.done, State.waiting])
    status: State;
}