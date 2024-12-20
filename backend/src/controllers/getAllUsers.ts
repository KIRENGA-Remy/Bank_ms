import { Request, Response } from 'express';
import User from '../models/userModel'; 
import bcrypt from 'bcrypt';

export const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};