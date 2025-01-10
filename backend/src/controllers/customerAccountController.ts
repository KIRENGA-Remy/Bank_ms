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

// withdraw money
export const withdrawMoney = async (req: Request, res: Response) => {
    try {
        const { accountNumber, amount } = req.body;

        if (amount <= 0) {
            res.status(400).json({ message: "Amount must be greater than 0." });
            return;
          }
        const account = await CustomerAccount.findOne(accountNumber)
        if( !account ) {
            res.status(404).json({ message: "Account not found."})
            return;
        }

        if ( account.balance < amount){
            res.status(400).json({ message: " Insufficient funds."})
            return;
        }

        account.balance -= amount;
        account.transactions.push({
            transactionId: `TXN-${Date.now()}`,
            type: "Withdrawal",
            amount,
            date: new Date(),
            details: "Withdrawal",
          });
        await account.save();
        res.status(200).json({ message: "Withdrawal successful", account });
    } catch (err) {
        res.status(500).json({ message: "Failed to withdraw money", err})
    }
}

//Transfer money
export const transferMoney = async (req: Request, res: Response) => {
    try {
        const { fromAccount, toAccount, amount } = req.body;

        if (amount <= 0) {
            res.status(400).json({ message: "Amount must be greater than 0." });
            return;
          }
          const sender = await CustomerAccount.findOne({ accountNumber: fromAccount})
          const recipient = await CustomerAccount.findOne({ accountNumber: toAccount})

          if (!sender || !recipient) {
            res.status(404).json({ message: "Account not found." });
            return;
          }

          if (sender.balance < amount) {
            res.status(400).json({ message: "Insufficient funds in sender's account." });
            return;
          }
          // Deduct from sender
          sender.balance -= amount;
          sender.transactions.push({
            transactionId: `TXN-${Date.now()}`,
            type: "Transfer",
            amount,
            date: new Date(),
            details: `Transfer to ${toAccount}`
          })

          // Add to recipient
          recipient.balance += amount;
          recipient.transactions.push({
            transactionId: `TXN-${Date.now()}`,
            type: "Transfer",
            amount,
            date: new Date(),
            details: `Transfer from ${fromAccount}`
          })

          await sender.save();
          await recipient.save();

          res.status(200).json({ message: "Transfer successful", sender, recipient });
    } catch (err) {
        res.status(500).json({ message: "Failed to transfer money", err})
    }
}

// Fetch account details
export const getAccountDetails = async (req: Request, res:Response): Promise<void> => {
    try {
        const { accountNumber } = req.params;
    
        const account = await CustomerAccount.findOne({ accountNumber });
        if (!account) {
        res.status(404).json({ message: "Account not found." });
        return;
        }
    
        res.status(200).json({ account });
      } catch (err) {
        res.status(500).json({ message: "Failed to fetch account details", err });
      }
}