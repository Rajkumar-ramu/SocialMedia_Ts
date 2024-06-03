import { ObjectId } from "mongodb";
import { Column, Entity, ObjectIdColumn,BaseEntity} from "typeorm";
import { IsNotEmpty, IsString, Length } from "class-validator";

@Entity("feedposts")
export class Feedpost extends BaseEntity{
    @ObjectIdColumn()
    _id: ObjectId = new ObjectId();
    @Column()
    postId?: string
    @Column()
    @Length(10, 20)
    content?: string;
    @Column()
    @IsNotEmpty()
    tags?: string;
    @Column()
    media?: string;
    @Column()
    @IsString()
    url?: string;
}
