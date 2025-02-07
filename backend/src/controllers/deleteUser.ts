import { Request, Response } from 'express';
import User from '../models/userModel'; 

export const deleteUser = async (req: Request, res: Response) : Promise<void> => {
    try {
        const { id } = req.params;

        const user = await User.findByIdAndDelete(id);
        if (!user) {
            res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};