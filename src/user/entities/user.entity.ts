import { CvEntity } from "../../cv/entities/cv.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    username: string;
    @Column()
    email: string;
    @Column()
    password: string;
    @OneToMany(type => CvEntity,
        (cv) => cv.user, {
        cascade: true,
        nullable: true,
        eager: true
    })
    cvs: CvEntity[]

}
