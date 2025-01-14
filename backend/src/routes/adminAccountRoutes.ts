import express from 'express'
import { swaggerSpec, swaggerUi } from '../config/swaggerConfig';
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

/** 
 * @swagger
 * /admin/account/:accountNumber/deactivate:
 *   put:
 *     summary: Deactivate an account
 *     description: This endpoint deactivates an account based on the account number. If there is a reactivation request, it will process the deactivation and set the account as inactive.
 *     parameters: 
 *       - in: path
 *         name: accountNumber
 *         required: true
 *         description: The account number to deactivate.
 *         schema: 
 *           type: string
 *     responses: 
 *       200:
 *         description:  Account has been successfully deactivated.
 *       400: 
 *         description: No reactivation request found for this account.
 *       404: 
 *         description: Account not found.
 *       500: 
 *         description: Failed to deactivate account due to an internal error.
 */
router.put('/account/:accountNumber/deactivate', deactivateAccount);

/** 
 * @swagger
 * /admin/account/:accountNumber/reactivate:
 *   put:
 *     summary: Reactivate an account
 *     description: This endpoint reactivates an account based on the account number.
 *     parameters: 
 *       - in: path
 *         name: accountNumber
 *         required: true
 *         description: The account number to reactivate.
 *         schema: 
 *           type: string
 *     responses: 
 *       200:
 *         description: Account has been successfully reactivated.
 *       404: 
 *         description: Account not found.
 *       500: 
 *         description: Failed to reactivate account due to an internal error.
 */
router.put('/account/:accountNumber/reactivate', reactivateAccount);

/** 
 * @swagger
 * /accounts:
 *   get:
 *     summary: Get all accounts
 *     description: This endpoint retrieves all customer accounts from the database.
 *     responses: 
 *       200:
 *         description: A list of all accounts.
 *       500: 
 *         description: Failed to fetch accounts.
 */
router.get('/accounts', getAllAccounts);

/** 
 * @swagger
 * /account/:accountNumber/update:
 *   put:
 *     summary: Update an account
 *     description: This endpoint allows updating an account based on the account number.
 *     parameters: 
 *       - in: path
 *         name: accountNumber
 *         required: true
 *         description: The account number to update.
 *         schema: 
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerName:
 *                 type: string
 *               balance:
 *                 type: number
 *     responses: 
 *       200:
 *         description: Account updated successfully.
 *       404:
 *         description: Account not found.
 *       500:
 *         description: Failed to update account due to an internal error.
 */
router.put('/account/:accountNumber/update', updateAccount);

/** 
 * @swagger
 * /account/:accountNumber/transactions:
 *   get:
 *     summary: Get account transactions
 *     description: This endpoint retrieves all transactions of a specific account.
 *     parameters: 
 *       - in: path
 *         name: accountNumber
 *         required: true
 *         description: The account number to fetch transactions for.
 *         schema: 
 *           type: string
 *     responses: 
 *       200:
 *         description: A list of account transactions.
 *       404: 
 *         description: Account not found.
 *       500: 
 *         description: Failed to fetch account transactions.
 */
router.get('/account/:accountNumber/transactions', getAccountTransactions);

/** 
 * @swagger
 * /account/:accountNumber/delete-account:
 *   delete:
 *     summary: Delete an account
 *     description: This endpoint deletes a customer account based on the account number.
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
 *       404: 
 *         description: Account not found.
 *       500: 
 *         description: Failed to delete account due to an internal error.
 */
router.delete('/account/:accountNumber/delete-account', deleteAccount);

/** 
 * @swagger
 * /accounts/get-financial-reports:
 *   get:
 *     summary: Get financial reports
 *     description: This endpoint generates a financial report based on account transactions (total deposits, withdrawals, transfers, and active accounts count).
 *     responses: 
 *       200:
 *         description: Financial report generated successfully.
 *       500: 
 *         description: Failed to generate financial reports.
 */
router.get('/accounts/get-financial-reports', getFinancialReports);

/** 
 * @swagger
 * /accounts/get-transaction-analytics:
 *   get:
 *     summary: Get transaction analytics
 *     description: This endpoint provides transaction analytics, including transaction types and their respective totals.
 *     parameters: 
 *       - in: query
 *         name: startDate
 *         required: false
 *         description: The start date for filtering transactions.
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: endDate
 *         required: false
 *         description: The end date for filtering transactions.
 *         schema:
 *           type: string
 *           format: date
 *     responses: 
 *       200:
 *         description: Transaction analytics data.
 *       500: 
 *         description: Failed to fetch transaction analytics.
 */
router.get('/accounts/get-transaction-analytics', getTransactionAnalytics);

/** 
 * @swagger
 * /account/send-customer-notofication:
 *   post:
 *     summary: Send notification to customer
 *     description: This endpoint sends a notification message to a customer.
 *     parameters:
 *       - in: path
 *         name: customerId
 *         required: true
 *         description: The customer ID to send the notification to.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               message:
 *                 type: string
 *     responses: 
 *       200:
 *         description: Notification sent successfully.
 *       404: 
 *         description: Customer not found.
 *       500: 
 *         description: Failed to send notification due to an internal error.
 */
router.post('/account/:customerId/send-customer-notification', sendCustomerNotification);

/** 
 * @swagger
 * /accounts/export-financial-data-csv:
 *   get:
 *     summary: Export financial data as CSV
 *     description: This endpoint exports financial data (e.g., customer name, balance, transactions) in CSV format.
 *     responses:
 *       200:
 *         description: Financial data exported successfully in CSV format.
 *       500:
 *         description: Failed to export financial data.
 */
router.get('/accounts/export-financial-data-csv', exportFinancialDataAsCSV);

/** 
 * @swagger
 * /accounts/export-financial-data-pdf:
 *   get:
 *     summary: Export financial data as PDF
 *     description: This endpoint exports financial data (e.g., customer name, balance, transactions) in PDF format.
 *     responses:
 *       200:
 *         description: Financial data exported successfully in PDF format.
 *       500:
 *         description: Failed to export financial data as PDF.
 */
router.get('/accounts/export-financial-data-pdf', exportFinancialDataAsPDF);

export default router;
