import { Request, Response } from 'express';
import User from '../models/userModel'; 

export const getUserById = async (req: Request, res: Response) : Promise<void> => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        const userResponse = {
            _id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            role: user.role,
            picturePath: user.picturePath
        }
        res.status(200).json({ message: "User retrieved", user: userResponse });
    } catch (err) {
        console.log({message: "Consoling a user", err});
        res.status(500).json({message: "Failed to get a user."});
    }
};

