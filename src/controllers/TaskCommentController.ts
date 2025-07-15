import { Request, Response } from "express";
import taskCommentData from "../validators/taskComments";
import TaskCommentsService from "../services/TaskCommentsService";


const createTaskComments = async (req: Request, res: Response) => {
  try {
    const taskId = req.params.taskid;
    const taskComments = taskCommentData.parse(req.body);
    console.log("---------> TaskComments:", taskComments, taskId);
    const createdTaskComments = await TaskCommentsService.createTaskComments(
      taskComments,
      Number(taskId)
    );
    res.status(200).json(createdTaskComments);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error";
    taskCommentData;
    res.status(400).json({ message });
  }
};

const getTaskComments = async (req: Request, res: Response) => {
  try {
    const taskComments = await TaskCommentsService.getAllTaskComments();
    res.status(200).json(taskComments);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error";
    res.status(400).json({ message });
  }
};
const getTaskCommentsByTaskId = async (req: Request, res: Response) => {
  try {
    const taskId = req.params.taskid;
    const taskComments = await TaskCommentsService.getTaskCommentsByTaskId(
      Number(taskId)
    );
    res.status(200).json(taskComments);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error";
    res.status(400).json({ message });
  }
};

const updateTaskCommments = async (req: Request, res: Response) => {
  try {
    const taskId = req.params.taskid;
    const commentId = req.params.commentid;
    const taskComments = taskCommentData.parse(req.body);
    const updatedTaskComments = await TaskCommentsService.updateTaskComments(
      Number(taskId),
      taskComments,
      Number(commentId)
    );
    res.status(200).json(updatedTaskComments);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error";
    res.status(400).json({ message: message, error: err });
  }
};

const deleteTaskComment = async (req: Request, res: Response) => {
  try {
    const commentId = req.params.commentid;
    await TaskCommentsService.deleteTaskCommentById(Number(commentId));
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error";
    res.status(400).json({ message });
  }
};

export default {
  createTaskComments,
  getTaskComments,
  updateTaskCommments,
  getTaskCommentsByTaskId,
  deleteTaskComment,
};
