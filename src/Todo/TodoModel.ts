import { State } from "./Status";
import { CommonService } from "src/Common/CommonService";
import { Inject, Injectable } from "@nestjs/common";
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