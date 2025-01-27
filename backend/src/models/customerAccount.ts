import { model, Schema, Document } from "mongoose";
import { v4 as uuidv4 } from "uuid"; // To generate unique identifiers

const TransactionSchema = new Schema({
  transactionId: { type: String, required: true },
  type: { type: String, required: true, enum: ["Deposit", "Withdrawal", "Transfer"] },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  details: { type: String }
});

const NotificationSchema = new Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: Date, default: Date.now },
  isRead: { type: Boolean, default: false}
});

const CustomerAccountSchema = new Schema({
  accountNumber: { type: String, unique: true },
  customerName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    postalCode: { type: String }
  },
  balance: { type: Number, required: true, default: 0 },
  accountType: { type: String, required: true, enum: ["Savings", "Current", "Business"] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  transactions: [TransactionSchema],
  isActive: { type: Boolean, default: true },
  password: { type: String, required: true },
  deactivationRequest: { type: Boolean, default: false },
  reactivationRequest: { type: Boolean, default: false },
  notifications: [NotificationSchema]
});

// Pre-save hook to generate the accountNumber
CustomerAccountSchema.pre("save", async function (next) {
  if (this.isNew) {
    const accountPrefix = "AC";
    const randomSuffix = Math.floor(100000000 + Math.random() * 900000000); // generates a random 9-digit number
    this.accountNumber = `${accountPrefix}${randomSuffix}`;
  }
  next();
});

export interface ICustomerAccount extends Document {
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
  password: string;
  deactivationRequest: boolean;
  reactivationRequest: boolean;
  notifications: {
    title: string;
    message: string;
    date: Date;
    isRead: Boolean;
  }[];
}

export const CustomerAccount = model<ICustomerAccount>("CustomerAccount", CustomerAccountSchema);
