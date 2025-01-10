import express, { NextFunction, Request, Response } from 'express';
import userRoutes from './routes/userRoutes'; 
import connectDB from './config/db';
import customerAccountRoutes from './routes/customerAccountRoutes'
import adminAccountRoutes from './routes/adminAccountRoutes'
import { config } from 'dotenv';

config()

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

// Middleware
app.use(express.json());

// Registration routes
app.use('/api/users', userRoutes);
// Customer routes
app.use('/api/customers', customerAccountRoutes)
// Admin routes
app.use('/api/admin', adminAccountRoutes)

// Error handling middleware (optional)
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});
