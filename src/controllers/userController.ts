
import {Request, Response} from 'express';
import { User } from '../models/user';
import { AppDataSource } from '../config/data';


export const getall = async (req: Request, res: Response) => {
    try {
        const users = await AppDataSource.manager.find(User);
        res.status(200).json({
            status: 'success',
            data: {
                users
            }
        });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export const addUser = async (req: Request, res: Response) => {
    const { email, name, password } = req.body;
    try{
        const addUser = await AppDataSource.manager.create(User, { email, name, password})
        await AppDataSource.manager.save(addUser);

        console.log(addUser);
        
        res.status(200).json(addUser);
    }catch(error: any){
        res.status(400).json({error: error.message})
    }
}
export const updateUser = async(req: Request, res: Response) => {
    console.log('params', req.params);
    
    const {userId}= req.params
    try {
        const updateComment = await AppDataSource.manager.update(User, {userId: userId}, req.body);
        res.status(200).json(updateComment)
    } catch (error: any) {
        res.status(400).json({error: error.message});
    }

}

export const deleteUser = async (req: Request, res: Response) => {
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