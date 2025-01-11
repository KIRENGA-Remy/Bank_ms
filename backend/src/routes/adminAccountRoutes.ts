import express from 'express'
import { deactivateAccount, getAllAccounts, reactivateAccount, updateAccounts } from '../controllers/adminAccountController';

const router = express.Router();
router.put('/account/:accountNumber/deactivate', deactivateAccount);
router.put('/account/:accountNumber/reactivate', reactivateAccount);
router.get('/accounts', getAllAccounts)
router.put('/account/update', updateAccounts)

export default router;