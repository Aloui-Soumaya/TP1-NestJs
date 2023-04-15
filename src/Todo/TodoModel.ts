import { State } from "./Status";
export class Todo {
    id: number;
    name: string;
    description: string;
    dateDeCreation: Date = new Date();
    status: State = State.waiting;
    userId: string;
    constructor(name: string, description: string, userId: string) {
        this.name = name;
        this.description = description;
        this.userId = userId;
    }
}