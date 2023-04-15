import {
    CreateDateColumn,
    DeleteDateColumn,
    UpdateDateColumn,
} from 'typeorm';

export class TimeStamp {
    @CreateDateColumn({
        type: Date,
        name: 'created_at',
    })
    createdAt: Date;
    @UpdateDateColumn({
        type: Date,
        name: 'updated_at',
    })
    updatedAt: Date;
    @DeleteDateColumn({
        type: Date,
        name: 'deleted_at',
    })
    deletedAt: Date;
}