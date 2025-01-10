import express from 'express'
import { 
    createAccount, 
    withdrawMoney, 
    depositMoney, 
    transferMoney, 
    getAccountDetails, 
    viewCustomerProfile, 
    viewAccountBalance, 
    getTransactions 
} from '../controllers/customerAccountController';

const router = express.Router();
router.post('/create', createAccount);
router.post('/deposit', depositMoney)
router.post('/withdraw', withdrawMoney)
router.post('/transfer', transferMoney)
router.get('/:accountNumber', getAccountDetails)
router.get('/profile/:accountNumber', viewCustomerProfile); 
router.get('/balance/:accountNumber', viewAccountBalance);
router.get('/:accountNumber/transactions', getTransactions);

export default router;