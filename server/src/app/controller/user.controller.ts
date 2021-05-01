import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

import UserModel from '../model/user.model';
import { IUser } from '../interface/iuser';

import { hashSync, compareSync, genSalt } from 'bcryptjs';

const salt = 8;
const key: string = "secretKey";

export async function signin(req: Request, res: Response): Promise<Response>{
    try {
        const { email, password } = req.body;
        const user: IUser = <IUser><unknown>(await UserModel.findOne({ email }));
        if(!user){
            throw new Error("User not found");
        }
        if(!(await compareSync(password, user.password))){
            throw new Error("Password don't match");
        }
        const token = jwt.sign({ _id: user._id }, key);
        return res.status(200).json({
            user, token
        });
    } catch (error) {
        return res.status(500).json({ 
            message: "Error",
            error: error.message
        });
    }
}

export async function signup(req: Request, res: Response): Promise<Response>{
    try {
        let { email } = req.body;
        let password = await hashSync(req.body.password, await genSalt(salt));
        const user = await UserModel.create({email, password});
        const token = jwt.sign({ _id: user._id }, key);
        return res.status(200).json({ user, token });
    } catch (error) {
        return res.status(500).json({ message: "Post"});
    }
}

export function verifyToken(req: Request, res: Response, next: NextFunction) {
    if(!req.headers.authorization){
        return res.status(401).send("Un-authorize Request");
    }
    let token = <string>req.headers.authorization;
    token = token.split(' ')[1];
    if(!token){
        return res.status(401).send("Un-authorize Request");
    }
    try{
        const payload = <JWTObj>jwt.verify(token, 'secretKey');
        req.userID = payload._id;
    }catch(error){
        return res.sendStatus(401);
    }
    next();
}

interface JWTObj{
    _id: string,
    iat: number
}