import { State } from "./Status";

export class TodoUpdate {
    name?: string;
    description?: string;
    status?: State;
}