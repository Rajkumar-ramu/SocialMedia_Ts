import "reflect-metadata"
import { DataSource } from "typeorm";
import {User} from  '../models/user';
import {Feedpost} from '../models/feedpost';
import {Comment} from '../models/comment';

export const AppDataSource = new DataSource({
    type: "mongodb",
    url: "localhost",
    useNewUrlParser: true,
    synchronize: true,
    logging: true,
    entities: [User, Feedpost, Comment]
})
