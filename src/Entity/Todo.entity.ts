import { State } from "../Status";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { DateTime } from "./DateTime";

@Entity('todo')
export class TodoEntity extends DateTime {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({ type: 'enum', enum: State, default: State.waiting })
    status: State;

    @Column()
    userId: string;

}