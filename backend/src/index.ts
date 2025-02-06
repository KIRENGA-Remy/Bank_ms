import express, { NextFunction, Request, Response } from 'express';
import userRoutes from './routes/userRoutes.js'; 
import connectDB from './config/db.js';
import customerAccountRoutes from './routes/customerAccountRoutes.js'
import adminAccountRoutes from './routes/adminAccountRoutes.js'
import { config } from 'dotenv';
import { swaggerSpec, swaggerUi } from './config/swaggerConfig.js';
import { v4 as uuidv4 } from 'uuid';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import multer from 'multer';
import bodyParser from 'body-parser';

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
app.use(express.json({ limit:'30mb' }));
app.use(cookieParser());
app.use(bodyParser.json())
app.use(express.urlencoded({ limit: '30mb', extended: true }));
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

const storage = multer.diskStorage({
    destination(req: Request, file: any, callback: any){
        callback(null, './images');
    },
    filename(req: Request, file: any, callback: any){
        callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
    }
})

const upload = multer({ storage });
app.post('/api/upload', upload.array('photo', 3), (req, res) => {
    console.log('file', req.files);
    console.log('body', req.body);
    res.status(200).json({
      message: 'success!',
    });
  });

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});
