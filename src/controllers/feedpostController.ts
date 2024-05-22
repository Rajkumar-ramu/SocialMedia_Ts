
import {Request, Response} from 'express';
import { Feedpost } from '../models/feedpost';
import { AppDataSource } from '../config/data';


export const getAllFeedPosts = async (req: Request, res: Response) => {
    try {
        const feeds = await AppDataSource.manager.findAndCount(Feedpost);
        res.status(200).json({
            status: 'success',
            data: {
                feeds
            }
        });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export const createFeedPost = async (req: Request, res: Response) => {
    const { content, tags, media } = req.body;
    try{
        const addFeed = await AppDataSource.manager.create(Feedpost, { content, tags, media})
        await AppDataSource.manager.save(addFeed);
        res.status(200).json(addFeed);
    }catch(error: any){
        res.status(400).json({error: error.message})
    }
}
export const updateFeedPost = async(req: Request, res: Response) => {
    console.log('params', req.params);
    
    const {id}= req.params
    try {
        const updateFeed = await AppDataSource.manager.update(Feedpost, {id: id}, req.body);
        res.status(200).json(updateFeed)
    } catch (error: any) {
        res.status(400).json({error: error.message});
    }

}

export const deleteFeedPost = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deleteFeed = await AppDataSource.manager.delete(Feedpost, {id: id});
        
        if (!deleteFeed) {
            return res.status(404).json({ error: 'Feed not found' });
        }   
        res.status(200).json({ message: 'Feed deleted successfully' });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};
