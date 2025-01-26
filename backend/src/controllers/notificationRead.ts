import { Request, Response } from "express";
import userModel, { IUser} from "../models/userModel";
export interface CustomUserIdRequest extends Request{
    user?: {
        id: string
    }
}

export const markNotificationAsRead = async (req: CustomUserIdRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user?.id;
        const user = await userModel.findById(userId) as IUser | null;
        if(!user){
            res.status(403).json("You're required to login");
            return;
        }
        user.notifications.forEach((notification) =>{
            notification.isRead == true
        })
        await user.save()
        res.status(200).json({ message: "Notification marked"})
    } catch (err) {
        console.error("Failed to mark as read notification", err)
        res.status(500).json({message: "Internal server error "})
    }
}