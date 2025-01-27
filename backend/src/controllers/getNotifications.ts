import { NextFunction, Request, Response } from "express";
import { CustomerAccount } from "../models/customerAccount";

export interface CustomUserIdRequest extends Request {
    user?: {
        id: string;
    };
}

export const getNotifications = async (
    req: CustomUserIdRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const customerId = req.user?.id;

        if (!customerId) {
            res.status(403).json({ message: "You're required to login" });
            return;
        }

        const customer = await CustomerAccount.findById(customerId).select('notifications');

        if (!customer) {
            res.status(404).json({ message: "Customer not found" });
            return;
        }

        const unreadNotifications = customer.notifications.filter(
            (notification) => !notification.isRead
        );

        res.status(200).json({
            notifications: customer.notifications,
            unreadCount: unreadNotifications.length,
        });
    } catch (err) {
        console.error("Failed to get notifications", err);
        next(err);
    }
};
