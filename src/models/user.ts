import { IsEmail, Length } from "class-validator";
import { ObjectId } from "mongodb";
import { Entity, Column, ObjectIdColumn, BaseEntity } from "typeorm";

@Entity("users")
export class User extends BaseEntity{
    @ObjectIdColumn()
    _id: ObjectId = new ObjectId(); 
    @Column()
    @IsEmail()
    email?: string;
    @Column()
    @Length(5, 25)
    name?: string;
    @Column()
    password?: string;
    @Column()
    userId?: string;

}
