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


export const updateAccount = async (req: Request, res: Response): Promise<void> => {
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


export const getAccountTransactions = async(req: Request, res: Response): Promise<void> => {
    try {
        const { accountNumber } = req.params;
        const account = await CustomerAccount.findOne({ accountNumber});
        if(!account){
            res.status(404).json({ message: "Account not found."});
            return;
        }
        res.status(200).json({ transactions: account.transactions})
    } catch (err) {
        res.status(500).json({ message: "Failed to get account's transactions.", err})
    }
}

export const deleteAccount = async (req: Request, res: Response): Promise<void> => {
    try {
        const { accountNumber } = req.params;
        const deletedAccount = await CustomerAccount.findOneAndDelete({ accountNumber });

    if (!deletedAccount) {
      res.status(404).json({ message: "No account found with the given account number." });
      return;
    }
    res.status(200).json({ message: "Account deleted successfully."})
    } catch (err) {
        res.status(500).json({ message: "Failed to delete account.", err})
    }
}


export const getFinancialReports = async (req: Request, res: Response): Promise<void> => {
    try {
        const totalDeposits = await CustomerAccount.aggregate([
            { $unwind: "$transactions"},
            { $match: { "transactions.type": "Deposit"}},
            { $group: {_id: null, totalAmount : { $sum: "$transactions.amount"}}}
        ]);

        const totalWithdrawals = await CustomerAccount.aggregate([
            {$unwind: "$transactions"},
            {$match: {"transactions.type": "Withdrawal"}},
            {$group: { _id: null, totalAmount: { $sum: "$transactions.amount"}}}
        ])

        const totalTransfers = await CustomerAccount.aggregate([
            { $unwind: "$transactions"},
            { $match: { "transactions.type": "Transfer"}},
            { $group: { _id: null, totalAmount: {$sum: "$transactions.amount"}}}
        ])

        const activeAccountsCount = await CustomerAccount.countDocuments({ isActive: true });

        res.status(200).json({ 
            totalDeposits: totalDeposits[0]?.totalAmount || 0,
            totalWithdrawals: totalWithdrawals[0]?.totalAmount || 0,
            totalTransfers: totalTransfers[0]?.totalAmount || 0,
            activeAccountsCount
        })
    } catch (err) {
        res.status(500).json({ message: "Failed to generate financial reports.", err})
    }
}


export const getTransactionAnalytics = async (req: Request, res: Response): Promise<void> => {
    try {
      const { startDate, endDate } = req.query;
  
      const matchCondition: any = {};
      if (startDate && endDate) {
        matchCondition["transactions.date"] = {
          $gte: new Date(startDate as string),
          $lte: new Date(endDate as string),
        };
      }
  
      const analytics = await CustomerAccount.aggregate([
        { $unwind: "$transactions" },
        { $match: matchCondition },
        {
          $group: {
            _id: "$transactions.type",
            totalTransactions: { $sum: 1 },
            totalAmount: { $sum: "$transactions.amount" },
          },
        },
      ]);
  
      res.status(200).json({ analytics });
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch transaction analytics.", err });
    }
  };
  

  export const sendCustomerNotification = async (req: Request, res: Response): Promise<void> => {
    try {
        const { customerId } = req.params;
        const { title, message } = req.body;

        const customer = await CustomerAccount.findById(customerId);
        if(!customer){
            res.status(404).json({ message: "Customer not found."})
            return;
        }
        const notification = {
            title,
            message,
            date: new Date()
        }
        customer.notifications = customer.notifications || [];
        customer.notifications.push(notification);
        await customer.save();
    } catch (err) {
        res.status(500).json({ message: "Failed to send notification to the customer.", err})
    }
  }