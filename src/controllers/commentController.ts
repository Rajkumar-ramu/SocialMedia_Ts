
import {Request, Response, NextFunction} from 'express';
import { Comment } from '../models/comment';
import { AppDataSource } from '../config/data';
import axios from "axios";

export const getAllComments =async (req: Request, res: Response, next: NextFunction) => {
    axios
    .get("https://socialmedia.free.beeceptor.com/comment")
    .then((response) => {
      const allCourses = response.data;
      console.log(allCourses);
      res.status(200).send(allCourses);
    })
    .catch((error) => {
      console.log("There was an error fetching the courses!", error.message);
      res.status(400).json({
        status: "Failed",
        error: error?.message ? error?.message : error,
      });
    });
}

    //FindandCount Method Implemented
// export const getComment = async (req: Request, res: Response) => {
//     console.log('*******')
//     try {
//         const comments = await AppDataSource.manager.findAndCount(Comment);
//         console.log('*******feeds', comments);
//         res.status(200).json({
//             status: 'success',
//             data: {
//                 comments
//             }
//         });
//     } catch (error: any) {
//         res.status(400).json({ error: error.message });
//     }
// }

export const postComment = async (req: Request, res: Response) => {
    const { content, likes, comment_id} = req.body;
    try{
        const addFeed = await AppDataSource.manager.create(Comment, { content, likes, comment_id})
        await AppDataSource.manager.save(addFeed);

        console.log(addFeed);
        
        res.status(200).json(addFeed);
    }catch(error: any){
        res.status(400).json({error: error.message})
    }
}

export const updateComment = async(req: Request, res: Response) => {
    console.log('params', req.params);
    
    const {commentId}= req.params
    try {

        const updateComment = await AppDataSource.manager.update(Comment,{commentId: commentId}, req.body);
        res.status(200).json(updateComment)
    } catch (error: any) {
        res.status(400).json({error: error.message});
    }

}

export const deleteComment = async (req: Request, res: Response) => {
    const { commentId } = req.params;

    try {
        const deleteComment = await AppDataSource.manager.delete(Comment, {commentId: commentId});
        
        if (!deleteComment) {
            return res.status(404).json({ error: 'Comment not found' });
        }
        
        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};