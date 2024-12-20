import { Request, Response } from 'express';
import User from '../models/userModel'; 
import bcrypt from 'bcrypt';

export const updateUser = async (req: Request, res: Response) : Promise<void> => {
    try {
        const { id } = req.params;
        const { firstname, lastname, email, password, role, picturePath } = req.body;

        const user = await User.findById(id);
        if (!user) {
            res.status(404).json({ error: 'User not found' });
        }

        if (password) {
            req.body.password = await bcrypt.hash(password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};