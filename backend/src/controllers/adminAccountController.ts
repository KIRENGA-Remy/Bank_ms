import { Request, Response } from 'express'
import { CustomerAccount } from '../models/customerAccount';

// Admin deactivates account
export const deactivateAccount = async (req: Request, res: Response): Promise<void> => {
    try {
        const { accountNumber } = req.params;

        const account = await CustomerAccount.findOne({ accountNumber });
        if (!account) {
            res.status(404).json({ message: "Account not found." });
            return;
        }

        // Check if the account has a deactivation request
        if (!account.reactivationRequest) {
            res.status(400).json({ message: "No reactivation request found for this account." });
            return;
        }

        account.isActive = false;
        account.deactivationRequest = false; 
        await account.save();

        res.status(200).json({ message: "Account has been deactivated." });
    } catch (err) {
        res.status(500).json({ message: "Failed to deactivate account", err });
    }
};


// Admin reactivates account
export const reactivateAccount = async (req: Request, res: Response): Promise<void> => {
    try {
        const { accountNumber } = req.params;

        const account = await CustomerAccount.findOne({ accountNumber });
        if (!account) {
            res.status(404).json({ message: "Account not found." });
            return;
        }

        // Reactivate the account
        account.isActive = true;
        account.reactivationRequest = false;  
        await account.save();

        res.status(200).json({ message: "Account has been reactivated." });
    } catch (err) {
        res.status(500).json({ message: "Failed to reactivate account", err });
    }
};


export const getAllAccounts = async (req: Request, res: Response): Promise<void> => {
    try {
        // Fetch accounts
        const accounts = await CustomerAccount.find()
        res.status(200).json( accounts )
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch accounts", err})
    }
}


export const updateAccounts = async (req: Request, res: Response): Promise<void> => {
    try {
        const { accountNumber } = req.params;

        const updates = req.body;

        // Find the account in the database
        const account = await CustomerAccount.findOne({ accountNumber });
        if (!account) {
            res.status(404).json({ message: "Account not found." });
            return;
        }
        const updatedAccount = await CustomerAccount.findOneAndUpdate(
            { accountNumber},
            { ...updates, updatedAt: new Date()},
            { new: true, runValidators: true}
        )
        if( !updatedAccount ){
            res.status(404).json({ message: "No account found."})
            return;
        }

        await updatedAccount.save()
        res.status(200).json({ message: "Account updated successfully.", account: updatedAccount });
    } catch (err) {
        console.error("Error updating account:", err);
        res.status(500).json({ message: "Failed to update account.", error: err });
    }
};

