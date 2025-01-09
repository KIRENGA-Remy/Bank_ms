import { Request, Response } from 'express'
import { CustomerAccount } from '../models/customerAccount';
import bcrypt from 'bcrypt'

export const createAccount = async (req: Request, res: Response) => {
    try {
        const { accountNumber, customerName, email, phone, address, accountType, password } = req.body;
        
        // check for existing account
        const existingAccount = await CustomerAccount.findOne({ email });
        if(existingAccount){
            res.status(400).json({ message: "Account with this email already exists."})
            return;
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10)

        //Create account
        const newAccount = new CustomerAccount({
            accountNumber,
            customerName,
            password: hashedPassword,
            email,
            phone,
            address,
            accountType
        })
        await newAccount.save();
        res.status(201).json({ message: "Account created successfully", account: newAccount})

    } catch (err) {
        res.status(500).json({ message: "Failed to create account", err})
    }
}