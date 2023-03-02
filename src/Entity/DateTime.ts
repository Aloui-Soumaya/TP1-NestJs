import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm"

export class DateTime {
    @CreateDateColumn({
        update: false,
    })
    CreatedAt?: Date
    @UpdateDateColumn()
    updatedAt?: Date
    @DeleteDateColumn()
    deletedAt?: Date
}