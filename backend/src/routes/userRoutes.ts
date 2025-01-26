import express from 'express';
import { createUser } from '../controllers/createUser' 
import { getAllUsers } from '../controllers/getAllUsers'
import { getUserById } from '../controllers/getUserById'
import { updateUser } from '../controllers/updateUser'
import { deleteUser } from '../controllers/deleteUser'
import { loginUser } from '../controllers/loginUser'
import { getNotifications } from '../controllers/getNotifications';
import { markNotificationAsRead } from '../controllers/notificationRead';
import { authenticate } from '../middleware/authMiddleware'

const router = express.Router();


/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: User Registration
 *     description: Registers a new user in the system.
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
 *               notifications:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                     message:
 *                       type: string
 *                     date:
 *                       type: string
 *                       format: date
 *                     isRead:
 *                       type: boolean
 *     responses:
 *       200:
 *         description: User created successfully.
 *         content:
 *           application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *               picturePath:
 *                 type: string
 *               notifications:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                     message:
 *                       type: string
 *                     date:
 *                       type: string
 *                       format: date
 *                     isRead:
 *                       type: boolean
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
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               users:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   firstname:
 *                     type: string
 *                   lastname:
 *                     type:string
 *                   email:
 *                     type: string
 *                   role:
 *                     type: string
 *                   picturePath:
 *                     type: string
 *                   notifications:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         title:
 *                           type: string
 *                         message:
 *                           type: string
 *                         date:
 *                           type: string
 *                           format: date
 *                         isRead:
 *                           type: boolean
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
 *         description: The user id to retrieve a user.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User details retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   _id:
 *                     type: string
 *                   firstname:
 *                     type: string
 *                   lastname:
 *                     type: string
 *                   email:
 *                     type: string
 *                   role:
 *                     type: string
 *                   picturePath:
 *                     type: string
 *                   notifications:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         title:
 *                           type: string
 *                         message:
 *                           type: string
 *                         date:
 *                           type: string
 *                           format: date
 *                         isRead:
 *                           type: boolean
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
 *               notifications:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                     message:
 *                       type: string
 *                     date:
 *                       type: string
 *                       format: date
 *                     isRead:
 *                       type: boolean
 *     responses:
 *       200:
 *         description: User updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id: 
 *                   type: string
 *                 firstname:
 *                   type: string
 *                 lastname:
 *                   type: string
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string
 *                 role:
 *                   type: string
 *                 picturePath:
 *                   type: string
 *                 notifications:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                       message:
 *                         type: string
 *                       date:
 *                         type: string
 *                         format: date
 *                       isRead:
 *                         type: boolean
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
/**
 * @swagger
 * /users/notifications:
 *   get:
 *     summary: Get notifications
 *     description: Get your notifications from this app.
 *     responses:
 *       200:
 *         description: Notifications retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   message:
 *                     type: string
 *                   date:
 *                     type: string
 *                     format: date
 *                   isRead:
 *                     type: boolean
 *       500:
 *         description: Failed to get notifications.
 */
router.get('/notifications', authenticate, getNotifications);

/**
 * @swagger
 * /users/notifications/mark-as-read:
 *   patch:
 *     summary: Mark notification
 *     description: Setting isRead of notifications to true.
 *     responses:
 *       200:
 *         description: Notification marked as read successfully.
 *       500:
 *         description: Failed to mark notification as read.
 */
router.patch('/notifications/mark-as-read', authenticate, markNotificationAsRead);

export default router;
