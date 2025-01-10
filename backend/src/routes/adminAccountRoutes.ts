import express from 'express'
import { deactivateAccount } from '../controllers/customerAccountController';

const router = express.Router();
router.put('/account/:accountNumber/deactivate', deactivateAccount);

export default router;