import express from 'express'
import { createAccount, withdrawMoney, depositMoney, transferMoney, getAccountDetails, viewCustomerProfile , viewAccountBalance } from '../controllers/customerAccountController';

const router = express.Router();
router.post('/create', createAccount);
router.post('/deposit', depositMoney)
router.post('/withdraw', withdrawMoney)
router.post('/transfer', transferMoney)
router.get('/:accountNumber', getAccountDetails)
router.get('/profile/:accountNumber', viewCustomerProfile); 
router.get('/balance/:accountNumber', viewAccountBalance);

export default router;