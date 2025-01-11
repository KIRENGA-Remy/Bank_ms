import express from 'express'
import { 
    createAccount, 
    withdrawMoney, 
    depositMoney, 
    transferMoney, 
    getAccountDetails, 
    viewCustomerProfile, 
    viewAccountBalance, 
    getTransactions, 
    requestReactivation,
    requestDeactivation,
    updateAccount,
    deleteAccount
} from '../controllers/customerAccountController';

const router = express.Router();
router.post('/create', createAccount);
router.post('/deposit/:accountNumber', depositMoney)
router.post('/withdraw/:accountNumber', withdrawMoney)
router.post('/transfer', transferMoney)
router.get('/:accountNumber', getAccountDetails)
router.get('/profile/:accountNumber', viewCustomerProfile); 
router.get('/balance/:accountNumber', viewAccountBalance);
router.get('/:accountNumber/transactions', getTransactions);
router.post('/account/:accountNumber/request-deactivation', requestDeactivation);
router.post('/account/:accountNumber/request-reactivation', requestReactivation);
router.put('/account/:accountNumber/update-account', updateAccount);
router.delete('/account/:accountNumber/delete-account', deleteAccount)

export default router;