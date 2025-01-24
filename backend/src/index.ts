import express, { NextFunction, Request, Response } from 'express';
import userRoutes from './routes/userRoutes'; 
import connectDB from './config/db';
import customerAccountRoutes from './routes/customerAccountRoutes'
import adminAccountRoutes from './routes/adminAccountRoutes'
import { config } from 'dotenv';
import { swaggerSpec, swaggerUi } from './config/swaggerConfig';
import { v4 as uuidv4 } from 'uuid';
import cors from 'cors'

config()

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

// Serve Swagger docs at /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(cors(
    {
        origin: 'http://localhost:8081',
        methods: ['POST','GET','PATCH','PUT','DELETE']
    }
))

// Middleware
app.use(express.json());
app.get('/', (req: Request, res: Response) => {
    res.send("APP is running");
});

// Registration routes
app.use('/users', userRoutes);
// Customer routes
app.use('/customers', customerAccountRoutes)
// Admin routes
app.use('/admin', adminAccountRoutes)

// Error handling middleware (optional)
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});
