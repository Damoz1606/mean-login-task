import { Request, Response } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

import UserModel from '../model/user.model';
import { IUser } from '../interface/iuser';

export async function getTask(req: Request, res: Response): Promise<Response>{
    try {
        const taskID: string = req.params.id;
        const user: IUser = <IUser><unknown>(await UserModel.findById(req.params.userID));
        if(!user){
            throw new Error("User don't found");
        }
        return res.status(200).json(user.tasks.find(item => item._id == taskID));
    } catch (error) {
        return res.status(500).json({ 
            message: "Error",
            error: error.message
        });
    }
}

export async function getTasks(req: Request, res: Response): Promise<Response>{
    try {
        const user: IUser = <IUser><unknown>(await UserModel.findById(req.params.userID));
        if(!user){
            throw new Error("User don't found");
        }
        return res.status(200).json(user.tasks.filter(item => item.visibility));
    } catch (error) {
        return res.status(500).json({ 
            message: "Error",
            error: error.message
        });
    }
}

export async function postTask(req: Request, res: Response): Promise<Response>{
    try {
        const task = {
            description: req.body.description,
            visibility: 1
        }
        const _id = req.params.userID;
        const user = await UserModel.findByIdAndUpdate(_id, {$push: { "tasks": task } }, { new: true });
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ 
            message: "Error",
            error: error.message
        });
    }
}

export async function putTask(req: Request, res: Response): Promise<Response>{
    try {
        const updatedTask = {
            description: req.body.description,
            visibility: req.body.visibility,
            done: req.body.done,
            _id: req.params.id
        }
        console.log(updatedTask);
        const _id = req.params.userID;
        const update = {$set: { "tasks.$[task]": updatedTask } };
        const options = { arrayFilters: [ {"task._id": req.params.id} ] };
        const user = await UserModel.updateOne({_id}, update, options);
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ 
            message: "Error",
            error: error.message
        });
    }
}

export async function deleteTask(req: Request, res: Response): Promise<Response>{
    try {
        const _id = req.params.userID;
        const taskID = req.params.id;
        const supr = { $pull: { "tasks": { "_id": taskID } } };
        const user = await UserModel.updateOne({_id}, supr);
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ 
            message: "Error",
            error: error.message
        });
    }
}

export async function deleteTasks(req: Request, res: Response): Promise<Response>{
    try {
        const _id = req.params.userID;
        const taskID = req.params.id;
        const supr = { $pull: { "tasks": {"visibility": 1} } };
        const user = await UserModel.updateOne({_id}, supr);
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ 
            message: "Error",
            error: error.message
        });
    }
}



export async function getPrivateTasks(req: Request, res: Response): Promise<Response>{
    try {
        const user: IUser = <IUser><unknown>(await UserModel.findById(req.params.userID));
        if(!user){
            throw new Error("User don't found");
        }
        return res.status(200).json(user.tasks.filter(item => !item.visibility));
    } catch (error) {
        return res.status(500).json({ 
            message: "Error",
            error: error.message
        });
    }
}

export async function postPrivateTask(req: Request, res: Response): Promise<Response>{
    try {
        const task = {
            description: req.body.description,
            visibility: 0
        }
        const _id = req.params.userID;
        const user = await UserModel.findByIdAndUpdate(_id, {$push: { "tasks": task } }, { new: true });
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ 
            message: "Error",
            error: error.message
        });
    }
}

export async function deletePrivateTasks(req: Request, res: Response): Promise<Response>{
    try {
        const _id = req.params.userID;
        const taskID = req.params.id;
        const supr = { $pull: { "tasks": { "visibility": 0 } } };
        const user = await UserModel.updateOne({_id}, supr);
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ 
            message: "Error",
            error: error.message
        });
    }
}