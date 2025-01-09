import mongoose, { model, Schema} from "mongoose";
const TransactionSchema = new Schema ({
    transactionId: { type: String, required: true},
    type: { type: String, required: true, enum: ["Deposit", "Withdrawal", "Transfer"]},
    amount: { type: Number, requied: true},
    date: { type: Date, default: Date.now},
    details: { type: String}
})

const CustomerAccountSchema = new Schema ({
    accountNumber: { type: String, required: true, unique: true},
    customerName: { type: String, required: true},
    email: { type: String, required: true, unique: true},
    phone: { type: String, required: true},
    address: {
        street: { type: String},
        city: {type: String},
        state: { type: String},
        postalCode: { type: String}
    },
    balance: { type: Number, required: true, default: 0},
    accountType: { type: String, required: true, enum: ["Savings", "Current", "Business"]},
    createdAt: { type: Date, default: Date.now},
    updatedAt: { type: Date, default: Date.now},
    transactions: [TransactionSchema],
    isActive: { type: Boolean, default: true},
    passwordHash: { type: String, required: true }
})

export interface ICustomerAccount extends Document{
    accountNumber: string;
    customerName: string;
    email: string;
    phone: string;
    address: {
      street: string;
      city: string;
      state: string;
      postalCode: string;
    };
    balance: number;
    accountType: "Savings" | "Current" | "Business";
    createdAt: Date;
    updatedAt: Date;
    transactions: {
      transactionId: string;
      type: "Deposit" | "Withdrawal" | "Transfer";
      amount: number;
      date: Date;
      details?: string;
    }[];
    isActive: boolean;
    passwordHash: string;
}

export const CustomerAccount = model<ICustomerAccount>("CustomerAccount", CustomerAccountSchema);