import { ObjectId } from "mongodb";
import { Column, Entity, ObjectIdColumn, BaseEntity } from "typeorm";
import {  IsBoolean, IsDate, IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

@Entity("comments")
export class Comment extends BaseEntity { 
    @ObjectIdColumn()
    _id: ObjectId = new ObjectId();
    @Column()
    comment_id?: string
    @Column()
    @Length(10, 20)
    content?: string
    @Column()
    @IsBoolean()
    isAuthor?: boolean
    @Column()
    @IsNotEmpty()
    author?: string
    @Column()
    likes?: string
    @Column()
    @IsEmail()
    authorEmail?: string
    @Column()
    @IsString()
    url?: string
    @Column()
    commentCount?: number
    @Column()
    authorAddress?: string
    @Column()
    @IsDate()
    date?: Date = new Date('2023-05-29')
}