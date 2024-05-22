import { ObjectId } from "mongodb";
import { Column, Entity, ObjectIdColumn, BaseEntity } from "typeorm";

@Entity("comments")

export class Comment extends BaseEntity{
    @ObjectIdColumn()
    _id: ObjectId = new ObjectId();

    @Column()
    comment_id?: string

    @Column()
    content?: string

    @Column()
    likes?: string

}