import { Request, Response } from 'express'
import { CustomerAccount } from '../models/customerAccount';
import { Parser } from 'json2csv';
import PDFDocument from 'pdfkit'
import mongoose from 'mongoose';


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
        if (!account.reactivationRequest == false) {
            res.status(400).json({ message: "No reactivation request found for this account." });
            return;
        }

        account.isActive = false;
        account.deactivationRequest = false; 
        await account.save();

        res.status(200).json({ message: "Account in inactivate mode." });
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
        // Check if the account has a deactivation request
        if (!account.deactivationRequest == false) {
            res.status(400).json({ message: "No deactivation request found for this account." });
            return;
        }

        // Reactivate the account
        account.isActive = true;
        account.reactivationRequest = false;  
        await account.save();

        res.status(200).json({ message: "Account in active mode." });
    } catch (err) {
        res.status(500).json({ message: "Failed to reactivate account", err });
    }
};


export const getAllAccounts = async (req: Request, res: Response): Promise<void> => {
    try {
        // Fetch accounts
        const accounts = await CustomerAccount.find()
        res.status(200).json({message: "Displaying all accounts ", accounts } )
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

        const updatedAccountResponse = {
            address: account.address,
            _id: account._id,
            customerName: account.customerName,
            email: account.email,
            phone: account.phone,
            balance: account.balance,
            accountType: account.accountType,
            isActive: account.isActive,
            deactivationRequest: account.deactivationRequest,
            reactivationRequest: account.reactivationRequest,
            updatedAt: account.updatedAt,
            transactions: account.transactions,
            notifications: account.notifications,
            accountNumber: account.accountNumber
    }
        res.status(200).json({ message: "Account updated successfully.", account: updatedAccountResponse });
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
  
      res.status(200).json({message: "Get account's financial analytics", analytics });
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
            date: new Date(),
            isRead: false
        }
        customer.notifications = customer.notifications || [];
        customer.notifications.push(notification);
        await customer.save();
        res.status(200).json({ message: "Notification sent successfully."})
    } catch (err) {
        res.status(500).json({ message: "Failed to send notification to the customer.", err})
    }
  }


export const exportFinancialDataAsCSV = async (req: Request, res: Response): Promise<void> => {
    try {
        const accounts = await CustomerAccount.find({}, "customerName balance transactions");
        const data = accounts.map((account: any) => ({
            customerName: account?.customerName,
            balance: account?.balance,
            totalTransactions: account?.transactions?.length
        }))

        const parser = new Parser();
        const csv = parser.parse(data);

        res.header("Content-Type", "text/csv");
        res.attachment("financial_data.csv");
        res.send(csv);
    } catch (err) {
        console.log("Exporting csv format error", err);
        res.status(500).json({ message: "Failed to export financial data as CSV"})
    }
}


export const exportFinancialDataAsPDF = async (req: Request, res: Response): Promise<void> => {
    try {
       const accounts = await CustomerAccount.find({}, "customerName balance transactions");
       const data = accounts.map((account: any) => ({
        customerName: account.customerName,
        balance: account.balance,
        totalTransactions: account.transactions.length
       }))

        // Create a new PDF document
       const doc = new PDFDocument();

       //Set response headers
       res.setHeader("Content-Type", "application/pdf");
       res.setHeader("Content-Disposition", "attachment; filename=financial_data.pdf");

       // Pipe the PDF document to the response
       doc.pipe(res)

       doc.fontSize(16).text('Financial Data Report', { align: 'center'})
       doc.moveDown();

       data.forEach((account: any, index: any) => {
        doc.fontSize(12).text(`Customer ${index + 1}:`);
        doc.text(` Name: ${account.customerName}`);
        doc.text(` Balance: $${account.balance}`);
        doc.text(` Total Transactions: ${account.totalTransactions}`);
        doc.moveDown()
       });

       doc.end();
    } catch (err) {
        res.status(500).json({ message: "Failed to export financial data as PDF", err})
    }
}


