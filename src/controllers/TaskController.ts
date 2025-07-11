import { Repo } from "../models/Repo";
import { Role } from "../models/Role";
import { Task } from "../models/Task";
import { TaskRepo } from "../models/TaskRepo";
import { User } from "../models/User";
import { UserTask } from "../models/UserTask";
import TaskService from "../services/TaskService";
import taskValidator from "../validators/task";
import { Request, Response } from "express";

const createTask = async (req: Request, res: Response) => {
  try {
    const taskData = taskValidator.taskData.parse(req.body);
    const createdTask = await TaskService.createTaskTransaction(taskData);
    res.status(201).json(createdTask);
  } catch (error) {
    res.status(500).json({ error: "Task creation failed" });
  }
};

const getAllTask = async (req: Request, res: Response) => {
  try {
      const filterData = taskValidator.taskFilter.parse(req.body);
      console.log(filterData);
      const tasks = await TaskService.getAllTask(filterData);
      res.json(tasks);

  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown Error";
    res.status(500).json({ message: message, error: err });
  }
};

const getTaskById = async (req: Request, res: Response) => {
  try {
    const task = await TaskService.getTaskById(req.params.id);
    res.status(200).json(task);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown Error";
    res.status(500).json({ message: message, error: err });
  }
};

const updateTask = async (req: Request, res: Response) => {
  const taskId = req.params.id;
  try {
    await TaskService.updateTaskTransactionService(req.body, Number(taskId));
    res.json({ message: "Task updated successfully" });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown Message";
    res.status(400).json({ message: message, error: err });
  }
};

const deleteTask = async (req: Request, res: Response) => {
  try {
    await TaskService.deleteTask(req.params.id);
    res.json({ message: "Task Deleted Sucessfully" });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown Message";
    res.status(400).json({ error: message });
  }
};

export default { createTask, getAllTask, getTaskById, updateTask, deleteTask };
