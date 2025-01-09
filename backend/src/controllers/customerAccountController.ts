import { Request, Response } from 'express'
import { CustomerAccount } from '../models/customerAccount';
import bcrypt from 'bcrypt'

export const createAccount = async (req: Request, res: Response) => {
    try {
        const { accountNumber, customerName, email, phone, address, accountType, password } = req.body;

        // Validate required fields
        if (!accountNumber || !customerName || !email || !phone || !accountType || !password) {
        res.status(400).json({ error: "Missing required fields" });
        return;
        }
        
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
            address: {
                street: address?.street || "",
                city: address?.city || "",
                state: address?.state || "",
                postalCode: address?.postalCode || "",
              },
            accountType
        })
        await newAccount.save();
        res.status(201).json({ message: "Account created successfully", account: newAccount})

    } catch (err) {
        res.status(500).json({ message: "Failed to create account", err})
    }
}

// Deposit money
export const depositMoney = async (req: Request, res: Response) => {
    try {
        const { accountNumber, amount } = req.body;
        if (amount <=0 ){
            res.status(400).json({ message: "Amount must be greater than 0."})
            return;
        }

        const account = await CustomerAccount.findOne({ accountNumber})
        if( !account ){
            res.status(404).json({ message: "Account not found."})
            return;
        }
        account.balance += amount;
        account.transactions.push({
            transactionId: `TXN-${Date.now()}`,
            type: "Deposit",
            amount,
            date: new Date(),
            details: "Deposit"
        })
        await account.save();
        res.status(201).json({ message: " Deposit successful", account})
    } catch (err) {
        res.status(500).json({ message: "Failed to deposit money", err})
    }
}

