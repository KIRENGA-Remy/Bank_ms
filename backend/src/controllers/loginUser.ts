import { Request, Response } from 'express';
import User from '../models/userModel'; 
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'Invalid email or password' });
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            process.env.SECRET_KEY as string ,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: 'Login successful',
            token,
            user: { id: user._id, email: user.email, role: user.role, firstname: user.firstname, lastname: user.lastname },
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
