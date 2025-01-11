import express from 'express'
import { 
    deactivateAccount, 
    getAllAccounts, 
    reactivateAccount, 
    updateAccount, 
    getAccountTransactions,
    deleteAccount,
    getFinancialReports
 } from '../controllers/adminAccountController';

const router = express.Router();
router.put('/account/:accountNumber/deactivate', deactivateAccount);
router.put('/account/:accountNumber/reactivate', reactivateAccount);
router.get('/accounts', getAllAccounts);
router.put('/account/update', updateAccount);
router.get('/account/:accountNumber/transactions', getAccountTransactions);
router.delete('/account/:accountNumber/delete-account', deleteAccount);
router.get('/accounts/get-financial-reports', getFinancialReports)

export default router;