import mongoose from 'mongoose';
import { config } from 'dotenv';

// Load environment variables from .env file
config();

const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI;
  if (!mongoURI) {
    console.error('MONGO_URI is not defined!');
    process.exit(1); 
  }

  try {
    const conn = await mongoose.connect(mongoURI);
    console.log('MongoDB Connected successfully');
  } catch (error) {
    console.error('Failed to connect to db', error);
    process.exit(1); 
  }
};

export default connectDB;
