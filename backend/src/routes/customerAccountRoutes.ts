import express from 'express'
import { withdrawMoney, depositMoney, transferMoney, getAccountDetails } from '../controllers/customerAccountController';

const router = express.Router();
router.post('/deposit', depositMoney)
router.post('/withdraw', withdrawMoney)
router.post('/transfer', transferMoney)
router.get('/:accountNumber', getAccountDetails)

export default router;