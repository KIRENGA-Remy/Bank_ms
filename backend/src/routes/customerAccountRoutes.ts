import express, { Request } from 'express';
import { 
    // createAccount, 
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
// import multer from 'multer';

// const storage = multer.diskStorage({
//     destination(req: Request, file: any, callback: any){
//         callback(null, 'uploads/');
//     },
//     filename(req: Request, file: any, callback: any){
//         callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
//     }
// })

// const upload = multer({ storage })
const router = express.Router();

/**
 * @swagger
 * /customers/create:
 *   post:
 *     summary: Create Customer account
 *     description: This endpoint helps to create customer account.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerName:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: object
 *                 properties:
 *                   street:
 *                     type: string
 *                   city:
 *                     type: string
 *                   state:
 *                     type: string
 *                   postalCode:
 *                     type: string
 *               accountType:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Account created successfully.
 *       400:
 *         description: Missing required fields.
 *       500:
 *         description: Failed to create account.
 */
// router.post('/create', createAccount);

/**
 * @swagger
 * /customers/deposit/{accountNumber}:
 *   post:
 *     summary: Deposit money into account
 *     description: This endpoint allows a customer to deposit money into their account.
 *     parameters:
 *       - in: path
 *         name: accountNumber
 *         required: true
 *         description: The account number to deposit into.
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Deposit successful.
 *       400:
 *         description: Invalid amount or other error.
 *       500:
 *         description: Failed to deposit money.
 */
router.post('/deposit/:accountNumber', depositMoney);

/**
 * @swagger
 * /customers/withdraw/{accountNumber}:
 *   post:
 *     summary: Withdraw money from account
 *     description: This endpoint allows a customer to withdraw money from their account.
 *     parameters:
 *       - in: path
 *         name: accountNumber
 *         required: true
 *         description: The account number to withdraw from.
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Withdrawal successful.
 *       400:
 *         description: Insufficient funds or invalid amount.
 *       500:
 *         description: Failed to withdraw money.
 */
router.post('/withdraw/:accountNumber', withdrawMoney);

/**
 * @swagger
 * /customers/transfer:
 *   post:
 *     summary: Transfer money from one account to another
 *     description: This endpoint allows a customer to transfer money from one account to another.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fromAccount:
 *                 type: string
 *               toAccount:
 *                 type: string
 *               amount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Transfer successful.
 *       400:
 *         description: Invalid transfer details or insufficient funds.
 *       500:
 *         description: Failed to transfer money.
 */
router.post('/transfer', transferMoney);

/**
 * @swagger
 * /customers/account/{accountNumber}:
 *   get:
 *     summary: Get account details
 *     description: Fetch the details of a customer account.
 *     parameters:
 *       - in: path
 *         name: accountNumber
 *         required: true
 *         description: The account number for which details are being requested.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Account details fetched successfully.
 *       404:
 *         description: Account not found.
 *       500:
 *         description: Failed to fetch account details.
 */
router.get('/account/:accountNumber', getAccountDetails);

/**
 * @swagger
 * /customers/profile/{accountNumber}:
 *   get:
 *     summary: View customer profile
 *     description: Fetch the profile details of a customer.
 *     parameters:
 *       - in: path
 *         name: accountNumber
 *         required: true
 *         description: The account number of the customer.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Profile fetched successfully.
 *       404:
 *         description: Account not found.
 *       500:
 *         description: Failed to fetch customer profile.
 */
router.get('/profile/:accountNumber', viewCustomerProfile);

/**
 * @swagger
 * /customers/balance/{accountNumber}:
 *   get:
 *     summary: View account balance
 *     description: Fetch the balance of a customer's account.
 *     parameters:
 *       - in: path
 *         name: accountNumber
 *         required: true
 *         description: The account number whose balance is being requested.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Balance fetched successfully.
 *       404:
 *         description: Account not found.
 *       500:
 *         description: Failed to fetch account balance.
 */
router.get('/balance/:accountNumber', viewAccountBalance);

/**
 * @swagger
 * /customers/{accountNumber}/transactions:
 *   get:
 *     summary: Get account transactions
 *     description: Retrieve transactions of a customer's account with pagination and filtering.
 *     parameters:
 *       - in: path
 *         name: accountNumber
 *         required: true
 *         description: The account number whose transactions are being requested.
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         required: false
 *         description: The page number for pagination.
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         required: false
 *         description: The number of transactions per page.
 *         schema:
 *           type: integer
 *       - in: query
 *         name: txn_type
 *         required: false
 *         description: Filter transactions by type (Deposit, Withdrawal, Transfer).
 *         schema:
 *           type: string
 *       - in: query
 *         name: startDate
 *         required: false
 *         description: Filter transactions by start date.
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: endDate
 *         required: false
 *         description: Filter transactions by end date.
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: minAmount
 *         required: false
 *         description: Filter transactions with amount greater than or equal to the specified value.
 *         schema:
 *           type: number
 *       - in: query
 *         name: maxAmount
 *         required: false
 *         description: Filter transactions with amount less than or equal to the specified value.
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Transactions fetched successfully.
 *       404:
 *         description: Account not found.
 *       500:
 *         description: Failed to fetch transactions.
 */
router.get('/:accountNumber/transactions', getTransactions);

/**
 * @swagger
 * /customers/account/{accountNumber}/request-deactivation:
 *   post:
 *     summary: Request deactivation of account
 *     description: Submit a request to deactivate a customer's account.
 *     parameters:
 *       - in: path
 *         name: accountNumber
 *         required: true
 *         description: The account number to request deactivation.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deactivation request submitted.
 *       400:
 *         description: Account already deactivated or other error.
 *       500:
 *         description: Failed to request deactivation.
 */
router.post('/account/:accountNumber/request-deactivation', requestDeactivation);

/**
 * @swagger
 * /customers/account/{accountNumber}/request-reactivation:
 *   post:
 *     summary: Request reactivation of account
 *     description: Submit a request to reactivate a customer's account.
 *     parameters:
 *       - in: path
 *         name: accountNumber
 *         required: true
 *         description: The account number to request reactivation.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Reactivation request submitted.
 *       400:
 *         description: Account is already active or other error.
 *       500:
 *         description: Failed to request reactivation.
 */
router.post('/account/:accountNumber/request-reactivation', requestReactivation);

/**
 * @swagger
 * /customers/account/{accountNumber}/update-account:
 *   put:
 *     summary: Update customer account
 *     description: This endpoint allows a customer to update their account details.
 *     parameters:
 *       - in: path
 *         name: accountNumber
 *         required: true
 *         description: The account number to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerName:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: object
 *                 properties:
 *                   street:
 *                     type: string
 *                   city:
 *                     type: string
 *                   state:
 *                     type: string
 *                   postalCode:
 *                     type: string
 *     responses:
 *       200:
 *         description: Account updated successfully.
 *       400:
 *         description: Invalid data or other error.
 *       500:
 *         description: Failed to update account.
 */
router.put('/account/:accountNumber/update-account', updateAccount);

/**
 * @swagger
 * /customers/account/{accountNumber}/delete-account:
 *   delete:
 *     summary: Delete customer account
 *     description: This endpoint allows a customer to delete their account.
 *     parameters:
 *       - in: path
 *         name: accountNumber
 *         required: true
 *         description: The account number to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Account deleted successfully.
 *       400:
 *         description: Invalid request or other error.
 *       500:
 *         description: Failed to delete account.
 */
router.delete('/account/:accountNumber/delete-account', deleteAccount);

export default router;
