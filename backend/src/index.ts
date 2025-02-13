import express, { Request, Response } from 'express';
import userRoutes from './routes/userRoutes.js'; 
import connectDB from './config/db.js';
import customerAccountRoutes from './routes/customerAccountRoutes.js'
import adminAccountRoutes from './routes/adminAccountRoutes.js'
import { config } from 'dotenv';
import { swaggerSpec, swaggerUi } from './config/swaggerConfig.js';
import { v4 as uuidv4 } from 'uuid';
import cors from 'cors';
import { CustomerAccount } from './models/customerAccount.js';
import bcrypt from 'bcrypt';
import validator from 'validator';

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
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.get('/', (req: Request, res: Response) => {
    res.send("APP is running");
  });

app.use('/users', userRoutes);
app.use('/customers', customerAccountRoutes)
app.use('/admin', adminAccountRoutes)
app.post('/customers/create', async (req: Request, res: Response) => {
    try {
      const { 
          customerName, 
          email, 
          phone, 
          accountType, 
          password,
          street, 
          state, 
          city, 
          postalCode,
          picturePath
      } = req.body 
      
      if (!customerName || !email || !phone || !accountType || !password) {
        res.status(400).json({ error: "Missing required fields" });
        return;
      }
  
      if (!validator.isEmail(email)) {
        res.status(400).json({ message: "Invalid email address." });
        return; 
      }
  
      if (password.length < 8) {
        res.status(400).json({ error: "Password must be at least 8 characters long."});
        return;
      }
      
      const existingAccount = await CustomerAccount.findOne({ email });
      if (existingAccount) {
        res.status(400).json({ message: "Account with this email already exists." });
        return;
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const newAccount = new CustomerAccount({
        customerName,
        password: hashedPassword,
        email,
        phone,
        address: { street, city, state, postalCode },
        accountType,
        picturePath
      });
      await newAccount.save();

      const responseAccount = {
        accountNumber: newAccount.accountNumber,
        customerName: newAccount.customerName,
        email: newAccount.email,
        phone: newAccount.phone,
        address: newAccount.address,
        accountType: newAccount.accountType,
        balance: newAccount.balance,
        picturePath: newAccount.picturePath
      };
  
      res.status(200).json({ message: "Account created successfully", account: responseAccount });
    } catch (err) {
      console.log("Error creating account", err);
      res.status(500).json({ message: "Failed to create account.", err });
    }
  });

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});
