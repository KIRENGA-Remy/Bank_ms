import { Request, Response } from 'express'
import { CustomerAccount } from '../models/customerAccount';

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