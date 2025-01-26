import { NextFunction, Request, Response } from "express";
import userModel, { IUser } from "../models/userModel";

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
        const userId = req.user?.id;

        if (!userId) {
            res.status(403).json({ message: "You're required to login" });
            return;
        }

        const user = await userModel.findById(userId).select('notifications') as IUser | null;

        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        const unreadNotifications = user.notifications.filter(
            (notification) => !notification.isRead
        );

        res.status(200).json({
            notifications: user.notifications,
            unreadCount: unreadNotifications.length,
        });
    } catch (err) {
        console.error("Failed to get notifications", err);
        next(err);
    }
};
