import express from 'express';
import { createUser } from '../controllers/createUser' 
import { getAllUsers } from '../controllers/getAllUsers'
import { getUserById } from '../controllers/getUserById'
import { updateUser } from '../controllers/updateUser'
import { deleteUser } from '../controllers/deleteUser'
import { loginUser } from '../controllers/loginUser'

const router = express.Router();


/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: User Registration
 *     description: Registers a new user in the system.
 *     requestBody:
 *       required: true
 *     content:
 *       application/json:
 *       schema:
 *         type: object
 *         properties:
 *           firstname:
 *             type: string
 *           lastname: 
 *             type: string
 *           email: 
 *             type: string
 *           password:
 *             type: string        
 *           role:
 *             type: string
 *           picturePath:
 *             type: string 
 *     responses:
 *       201: 
 *         description: User created successfully.
 *       400:
 *         description: User already exist.
 *       500:
 *         description: Failed to create a user.     
 */
router.post('/register', createUser);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: User Login
 *     description: Logs in a user with email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful.
 *       401:
 *         description: Invalid password.
 *       404:
 *         description: Invalid email.
 *       500:
 *         description: Failed to login.
 */
router.post('/login', loginUser);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get All Users
 *     description: Retrieves a list of all registered users.
 *     responses:
 *       200:
 *         description: List of users.
 *       500:
 *         description: Failed to fetch users.
 */
router.get('/', getAllUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get User by ID
 *     description: Retrieves details of a user by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User details.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Failed to fetch user.
 */
router.get('/:id', getUserById);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update User
 *     description: Updates a user's information.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *               picturePath:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Failed to update user.
 */
router.put('/:id', updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete User
 *     description: Deletes a user by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Failed to delete user.
 */
router.delete('/:id', deleteUser);

export default router;
