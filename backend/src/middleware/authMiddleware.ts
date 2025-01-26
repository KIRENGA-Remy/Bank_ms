import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'

export const authenticate = async (req: Request, res: Response, next: NextFunction) :Promise<void> => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if(!token){
            res.status(401).json({ message: "No token found, Please log in"})
            return;
        }
        jwt.verify(token, process.env.SECRET_KEY as string, (err: any, decoded: any) => {
            if(err){
                if(err.name === 'TokenExpiredError'){
                    res.status(401).json({ message: "Token has expired."})
                    return;
                } else {
                    res.status(401).json({ message: "Invalid token."})
                    return;
                }
                return;
            }
            (req as any).user = { id: decoded.id };
            next();
        })
    } catch (err) {
        res.status(500).json({ message: "Authentication failed due to server error.", err });
    }
}