import { ObjectId } from "mongodb";
import { Entity, Column, ObjectIdColumn, OneToMany, BaseEntity } from "typeorm";

@Entity("users")

export class User extends BaseEntity{
    @ObjectIdColumn()
    _id: ObjectId = new ObjectId(); 
    @Column()
    email?: string;

    @Column()
    name?: string;

    @Column()
    password?: string;

    @Column()
    userId?: string;

}
