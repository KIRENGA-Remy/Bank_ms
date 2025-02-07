import mongoose, { Schema, Document } from 'mongoose';
export interface IUser extends Document {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    role: 'Admin' | 'Teller' | 'Customer'; 
    picturePath: string;
}

const userSchema: Schema<IUser> = new Schema(
    {
        firstname: {
            type: String,
            required: [true, 'First name is required'],
            trim: true,
        },
        lastname: {
            type: String,
            required: [true, 'Last name is required'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            trim: true,
            lowercase: true,
            match: [
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                'Please enter a valid email',
            ],
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [6, 'Password must be at least 6 characters long'],
        },
        role: {
            type: String,
            enum: ['Admin', 'Teller', 'Customer'],
            default: 'Customer',
        },
        picturePath: {
            type: String,
            trim: true
        },
    },
    {
        timestamps: true, 
    }
);

export default mongoose.model<IUser>('User', userSchema);
