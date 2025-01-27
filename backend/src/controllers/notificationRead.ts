import { Request, Response } from "express";
import { CustomerAccount } from "../models/customerAccount";
export interface CustomUserIdRequest extends Request{
    user?: {
        id: string
    }
}

export const markNotificationAsRead = async (req: CustomUserIdRequest, res: Response): Promise<void> => {
    try {
        const customerId = req.user?.id;
        const customer = await CustomerAccount.findById(customerId);
        if(!customer){
            res.status(403).json("You're required to login");
            return;
        }
        customer.notifications.forEach((notification) =>{
            notification.isRead == true
        })
        await customer.save()
        res.status(200).json({ message: "Notification marked"})
    } catch (err) {
        console.error("Failed to mark as read notification", err)
        res.status(500).json({message: "Internal server error "})
    }
}