import { ObjectId } from "mongodb";
import { Column, Entity, ObjectIdColumn,BaseEntity} from "typeorm";

@Entity("feedposts")

export class Feedpost extends BaseEntity{

    @ObjectIdColumn()
    _id: ObjectId = new ObjectId();
    
    @Column()
      content?: string;

    @Column()
      tags?: string;

    @Column()
      media?: string;

    @Column()
      url?: string;
}
