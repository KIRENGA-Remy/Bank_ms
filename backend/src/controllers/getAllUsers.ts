import { Request, Response } from 'express';
import User from '../models/userModel'; 

export const getAllUsers = async (req: Request, res: Response):Promise<void> => {
    try {
        const users = await User.find();
        res.status(200).json({
            success: true,
            message: "Users fetched successfully.",
            data: users
        });
    } catch (err) {
        console.log("Error while getting all users.", err);
        res.status(500).json({ message: "Failed to get all users." });
    }
}; 