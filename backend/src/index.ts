import express, { NextFunction, Request, Response } from 'express';
import userRoutes from './routes/userRoutes'; 
import connectDB from './config/db';
import customerAccountRoutes from './routes/customerAccountRoutes'
import { config } from 'dotenv';

config()

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/customers', customerAccountRoutes)

// Error handling middleware (optional)
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});
