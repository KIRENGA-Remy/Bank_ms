import { Request, Response } from 'express';
import User from '../models/userModel'; 
import bcrypt from 'bcrypt';

export const createUser = async (req: Request, res: Response) : Promise<void> => {
    try {
        const { firstname, lastname, email, password, role, picturePath } = req.body;
        console.log(req.body);
        
        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: 'User already exist.' });
            return;
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
        
        const userResponse = {
            firstname: newUser.firstname,
            lastname: newUser.lastname,
            email: newUser.email,
            role: newUser.role,
            picturePath: newUser.picturePath,
        }
        res.status(201).json({ message: 'User created successfully.', user: userResponse });
    } catch (err:  any) {
        console.log("Error while registration", err);
        res.status(500).json({ message: "Failed to create a user."});
    }
};
