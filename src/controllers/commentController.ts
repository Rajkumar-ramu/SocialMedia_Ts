
import { Request, Response } from 'express';
import { Comment } from '../models/comment';
import { AppDataSource } from '../config/data';
import axios from "axios";
import { Param, Body, Post, Put, Delete, Req, Res, UseAfter, JsonController, UseInterceptor } from 'routing-controllers';
// import { AddCustomHeaderMiddleware } from '../middlewares/commentMiddleware'
import { LogingInterceptor } from "../interceptors/loggingInterceptor";

@JsonController()
@UseInterceptor(LogingInterceptor)

export class CommentController {
//AXIOS IMPLEMENTATION
    async getAllComments(req: Request, res: Response) {
        axios
          .get("https://socialmedia.free.beeceptor.com/comment")
          .then((response) => {
            const allComments = response.data;
            console.log(allComments);
            res.status(200).send(allComments);
          })
          .catch((error) => {
            console.log("There was an error fetching the courses!", error.message);
            res.status(400).json({
              status: "Failed",
              error: error?.message ? error?.message : error,
            });
          });
      }

    // @Get('/')
    // @UseBefore(commentMiddleware)
    // async getComment(@Req() req: Request, @Res() res: Response) {
    //     try {
    //         return res.send(await AppDataSource.manager.find(Comment));
    //     } catch (error: any) {
    //         console.log('errormessage', error.message);
    //         res.status(400).json({ status: 'GetComment Fail', error: error.message });
    //     }
    // }
    
    //@Post & Body
    @Post('/createComment')
    // @UseAfter(AddCustomHeaderMiddleware)
    async postComment( @Res() res: Response, @Body() reqbody: Comment) {
        console.log('***body', reqbody);
        const { content, likes, comment_id, author } = reqbody;
        try {
            const addComment = new Comment();
            addComment.content = content;
            addComment.likes = likes;
            addComment.comment_id = comment_id;
            addComment.author = author;
            const savedComment = await AppDataSource.manager.save(addComment);
            return res.status(200).json (savedComment); 
        //   return await AppDataSource.manager.save(addComment);
        } catch (error: any) {
            res.status(200).json({ error: error.message })
        }
    }
    @Put('/:id')
    // @UseAfter(AddCustomHeaderMiddleware)
    async updateComment(@Res() res: Response, @Param('id') id: number, @Body() body: any) {
        try {
            const updateComment = await AppDataSource.manager.update(Comment, id, body);
            console.log('updateComment', updateComment);
            return res.status(200).json(updateComment)
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
    @Delete('/:id')
    async deleteComment(@Req() req: Request, @Res() res: Response) {
        const { commentId } = req.params;

        try {
            const deleteComment = await AppDataSource.manager.delete(Comment, { commentId: commentId });

            if (!deleteComment) {
                return res.status(404).json({ error: 'Comment not found' });
            }
            return res.status(200).json({ message: 'Comment deleted successfully' });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
}