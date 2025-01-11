import express from 'express'
import { 
    deactivateAccount, 
    getAllAccounts, 
    reactivateAccount, 
    updateAccount, 
    getAccountTransactions,
    deleteAccount,
    getFinancialReports,
    getTransactionAnalytics,
    sendCustomerNotification,
    exportFinancialDataAsCSV,
    exportFinancialDataAsPDF
 } from '../controllers/adminAccountController';

const router = express.Router();
router.put('/account/:accountNumber/deactivate', deactivateAccount);
router.put('/account/:accountNumber/reactivate', reactivateAccount);
router.get('/accounts', getAllAccounts);
router.put('/account/update', updateAccount);
router.get('/account/:accountNumber/transactions', getAccountTransactions);
router.delete('/account/:accountNumber/delete-account', deleteAccount);
router.get('/accounts/get-financial-reports', getFinancialReports)
router.get('/accounts/get-transaction-analytics', getTransactionAnalytics)
router.get('/account/send-customer-notofication', sendCustomerNotification)
router.get('/accounts/export-financial-data-csv', exportFinancialDataAsCSV);
router.get('/accounts/export-financial-data-pdf', exportFinancialDataAsPDF)

export default router;