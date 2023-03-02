import { State } from "./Status";
export class Todo {
    id: number;
    name: string;
    description: string;
    dateDeCreation: Date = new Date();
    status: State = State.waiting;
    constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
    }
}