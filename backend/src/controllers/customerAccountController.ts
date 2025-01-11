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
        const { accountNumber } = req.params;
        const { amount } = req.body
        if (amount <=0 ){
            res.status(400).json({ message: "Amount must be greater than 0."})
            return;
        }

        const account = await CustomerAccount.findOne({ accountNumber})
        if( !account ){
            res.status(404).json({ message: "Account not found."})
            return;
        }

        if (!account.isActive) {
            res.status(400).json({ message: "This account is deactivated you're required to request reactivation to progress."});
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
        const { accountNumber } = req.params;
        const { amount } = req.body;

        if (amount <= 0) {
            res.status(400).json({ message: "Amount must be greater than 0." });
            return;
          }
        const account = await CustomerAccount.findOne({ accountNumber })
        if( !account ) {
            res.status(404).json({ message: "Account not found."})
            return;
        }

        if (!account.isActive) {
            res.status(400).json({ message: "This account is deactivated you're required to request reactivation to progress."});
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

          if (!sender.isActive) {
            res.status(400).json({ message: "This account is deactivated you're required to request reactivation to progress."});
            return;
        }
        if (!recipient.isActive) {
            res.status(400).json({ message: "This account is deactivated."});
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



export const viewCustomerProfile = async (req: Request, res: Response): Promise<void> => {
    try {
        const { accountNumber } = req.params;
        const account = await CustomerAccount.findOne({ accountNumber })
        if (!account){
            res.status(404).json({ message: "Account not found."})
            return;
        }
        const profile = {
            customerName: account.customerName,
            email: account.email,
            phone: account.phone,
            street: account.address.street,
            city: account.address.city,
            state: account.address.state,
            postalCode: account.address.postalCode,
            accountType: account.accountType,
            createdAt: account.createdAt,
        }
        res.status(200).json({ profile })
    } catch (err) {
        res.status(500).json({ message: "Failed to get customer profile", err})
    }
} 


export const viewAccountBalance = async (req: Request, res: Response): Promise<void> => {
    try {
      const { accountNumber } = req.params;
  
      const account = await CustomerAccount.findOne({ accountNumber });
      if (!account) {
        res.status(404).json({ message: "Account not found." });
        return;
      }
  
      res.status(200).json({ balance: account.balance });
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch account balance", err });
    }
  };

// Applications of pagination
export const getTransactions = async (req: Request, res: Response): Promise<void> => {
    try {
        const { accountNumber } = req.params;
        const { page=1, limit=10, txn_type, startDate, endDate, minAmount, maxAmount } = req.query

        // Convert query parameters to appropriate types
        const pageNumber = parseInt(page as string, 10);
        const pageSize = parseInt(limit as string, 10)

        const account = await CustomerAccount.findOne({ accountNumber});
        if (!account){
            res.status(404).json({ message: "Account not found." });
            return;
        }

        // Filter transaction based on query parameters
        let transactions = account.transactions;
        if (txn_type){
            transactions = transactions.filter((transaction: any) => transaction.type === txn_type);
        }

        if(startDate){
            const start = new Date(startDate as string);
            transactions = transactions.filter((transaction: any) => new Date(transaction.date) >= start);
        }

        if(endDate){
            const end = new Date(endDate as string);
            transactions = transactions.filter((transaction: any) => new Date(transaction.date) <= end);
        }

        if(minAmount){
            transactions = transactions.filter((transaction: any) => transaction.amount >= parseFloat(minAmount as string));
        }

        if(maxAmount){
            transactions = transactions.filter((transaction: any) => transaction.amount <= parseFloat(maxAmount as string));
        }

        // Paginate the filtered transactions
        const total = transactions.length;
        const paginatedTransactions = transactions.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
        res.status(200).json({ total, page: pageNumber, limit: pageSize, transactions: paginatedTransactions});
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch transactions", err });
    }
}


// Customer request to deactivate account
export const requestDeactivation = async (req: Request, res: Response): Promise<void> => {
    try {
        const { accountNumber } = req.params;

        const account = await CustomerAccount.findOne({ accountNumber });
        if (!account) {
            res.status(404).json({ message: "Account not found." });
            return;
        }

        // Only allow if the account is active
        if (!account.isActive) {
            res.status(400).json({ message: "Account is already deactivated." });
            return;
        }

        account.deactivationRequest = true;
        await account.save();

        res.status(200).json({ message: "Deactivation request has been submitted for admin review." });
    } catch (err) {
        res.status(500).json({ message: "Failed to submit deactivation request", err });
    }
};


// Customer request to deactivate account
export const requestReactivation = async (req: Request, res: Response): Promise<void> => {
    try {
        const { accountNumber } = req.params;

        const account = await CustomerAccount.findOne({ accountNumber });
        if (!account) {
            res.status(404).json({ message: "Account not found." });
            return;
        }

        // Only allow if the account is active
        if (account.isActive) {
            res.status(400).json({ message: "Account is already active." });
            return;
        }

        account.reactivationRequest = true;
        await account.save();

        res.status(200).json({ message: "Reactivation request has been submitted for admin review." });
    } catch (err) {
        res.status(500).json({ message: "Failed to submit reactivation request", err });
    }
};

interface CustomRequest extends Request {
    user?:{
        id: string
    }
}
export const updateAccount = async (req: CustomRequest, res: Response): Promise<void> => {
    try {
        const { accountNumber } = req.params;
        const customerId = req.user?.id;
        const updates = req.body;
        const account = await CustomerAccount.findOne({ accountNumber})
        if(!account){
            res.status(404).json({ message: "No account found."})
            return;
        }
        if( account._id.toString() !== customerId){
            res.status(403).json({ message: "You are not authorized to update this account." });
            return;
        }
         // Restrict the fields that can be updated
         const allowedUpdates = ["customerName", "email", "phone", "address"];
         const filteredUpdates: Partial<typeof updates> = {};
         for (const key of allowedUpdates) {
             if (updates[key] !== undefined) {
                 filteredUpdates[key] = updates[key];
             }
         }

        const updatedAccount = await CustomerAccount.findOneAndUpdate(
            { accountNumber},
            { ...filteredUpdates, updatedAt: new Date()},
            {new: true, runValidators: true}
        )

        res.status(200).json({ message: "Account updated successfully.", account: updatedAccount})
    } catch (err) {
        res.status(500).json({ message: "Failed to update account", err })
    }
}