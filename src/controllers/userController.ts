
import {Request, Response} from 'express';
import { User } from '../models/user';
import { AppDataSource } from '../config/data';
import { Body, Delete, Get, JsonController, Param, Post, Put, Req, Res, UseInterceptor } from 'routing-controllers';
import { LogingInterceptor } from "../interceptors/loggingInterceptor";

@JsonController('/')
@UseInterceptor(LogingInterceptor)
export class UserController{
   async getall (@Req() req: Request, @Res() res: Response) {
    try {
        const users = await AppDataSource.manager.find(User);
        return res.status(200).json (users); 
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}
@Post()
  async addUser(req: Request, res: Response) {
    const { email, name, password } = req.body;
    try{
        const addUser = await AppDataSource.manager.create(User, { email, name, password})
        await AppDataSource.manager.save(addUser);
        res.status(200).json(addUser);
    }catch(error: any){
        res.status(400).json({error: error.message})
    }
}
@Put('/:id')
   async updateUser (@Req() req: Request, @Res() res: Response) {
    console.log('params', req.params); 
    const {userId}= req.params
    try {
        const updateComment = await AppDataSource.manager.update(User, {userId: userId}, req.body);
        res.status(200).json(updateComment)
    } catch (error: any) {
        res.status(400).json({error: error.message});
    }

}
@Delete('/:id')
   async deleteUser (@Req() req: Request, @Res() res: Response) {
    const { userId } = req.params;
    try {
        const deleteUser = await AppDataSource.manager.delete(User, {userId: userId});
        
        if (!deleteUser) {
            return res.status(404).json({ error: 'User not found' });
        }   
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};
}