
import {Request, Response} from 'express';
import { Feedpost } from '../models/feedpost';
import { AppDataSource } from '../config/data';
import { Body, Delete, Get, JsonController, Param, Post, Put, Req, Res } from 'routing-controllers';

@JsonController('/feed')
export class FeedController{
@Get('/')
 async getAllFeedPosts (@Req() req: Request, @Res() res: Response) {
    try {
        const feeds = await AppDataSource.manager.findAndCount(Feedpost);
         return feeds;
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}
   @Post('/')
   async createFeedPost (@Body() body: any, req: Request, res: Response) {
    const { content, tags, media } = body;
    try{
        const addFeed = new Feedpost();
        addFeed.content = content;
        addFeed.tags = tags;
        addFeed.media = media
        const feed = await AppDataSource.manager.save(addFeed);
        console.log('addFeed', feed); 
        return feed
       }catch(error: any){
        res.status(400).json({ error: error.message });
    }
}
   @Put('/:id')
   async updateFeedPost (req: Request, res: Response) {
    console.log('params', req.params);
    
    const {id}= req.params
    try {
        const updateFeed = await AppDataSource.manager.update(Feedpost, {id: id}, req.body);
        res.status(200).json(updateFeed)
    } catch (error: any) {
        res.status(400).json({error: error.message});
    }

}
   @Delete('/:id')
   async deleteFeedPost (req: Request, res: Response, @Param("id") id: number) {
    try {
        const deteltedDepartment = await AppDataSource.manager.delete(
            Feedpost,
          {
            id: id,
          }
        );
        return res.status(200).json({
          status: "Successful",
          message: "Department deleted successfully",
        });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};
}