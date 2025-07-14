import { Request, Response } from "express";
import taskCommentData from "../validators/taskComments";
import TaskCommentsService from "../services/TaskCommentsService";

const createTaskComments = async(req:Request,res:Response) =>{
    try{
        const taskId = req.params.taskid;
        const taskComments = taskCommentData.parse(req.body);
        console.log("---------> TaskComments:",taskComments,taskId);
        const createdTaskComments = await TaskCommentsService.createTaskComments(taskComments,Number(taskId));
        res.status(200).json(createdTaskComments);
    } catch(err){
        const message = err instanceof Error ? err.message : "Error";taskCommentData
        res.status(400).json({message});
    }
}

export default {createTaskComments};