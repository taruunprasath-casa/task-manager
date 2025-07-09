import { Task } from "../models/Task";
import TaskRepoService from "../services/TaskRepoService";
import TaskService from "../services/TaskService";
import UserTaskService from "../services/UserTaskService";
import taskValidator from "../validators/task";
import { Request, Response } from "express";

const createTask = async (req: Request, res: Response) => {
  try {
    const taskData = taskValidator.taskData.parse(req.body);
    const createdTask = await TaskService.createTask(taskData);
    const userTasks = taskData.users.map((user) => ({
      user_id: user.userId,
      role_id: user.roleId,
      task_id: Number(createdTask.id),
    }));
    await UserTaskService.createUserTasks(userTasks);
    if (taskData.repos) {
      const taskRepo = taskData.repos.map((repo) => ({
        task_id: Number(createdTask.id),
        repo_id: repo.repoId,
        task_branch_name: repo.branchName,
      }));
      await TaskRepoService.createTaskRepo(taskRepo);
    }
    res.status(201).json(createdTask);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown Error";
    res.status(400).json({ message: message, error: err });
  }
};

const getAllTask = async (req: Request, res: Response) => {
  try {
    const filterData = taskValidator.taskFilters.parse(req.body.userIds);
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
    await TaskService.updateTaskTransactionService(req.body,Number(taskId));
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
