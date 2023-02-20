import { State } from "./Status";
import { v4 as uuidv4 } from 'uuid';
export class TodoModel {
    id: number = uuidv4();
    name: string;
    description: string;
    dateDeCreation: Date = new Date();;
    status: State.waiting;
}