import { Request, Response } from 'express';
import User from '../models/userModel'; 
import bcrypt from 'bcrypt';

export const createUser = async (req: Request, res: Response) : Promise<void> => {
    try {
        const { firstname, lastname, email, password, role, picturePath } = req.body;

        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ error: 'Email already in use' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            firstname,
            lastname,
            email,
            password: hashedPassword,
            role,
            picturePath,
        });

        await newUser.save();
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error:  any) {
        res.status(500).json({ error: error.message });
    }
};