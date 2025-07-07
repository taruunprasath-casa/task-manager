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
  const id = req.params.id;
  const { name, description, estimatedDate, stageId, repos, users } = req.body;
  try {
    const task = await Task.findByPk(id);
    if (task) {
      task.name = name;
      task.description = description;
      task.estimatedDate = estimatedDate;
      task.stage_id = stageId;
      await task.save();

      if (repos) {
        const taskRepo = repos.map((repo: { repoId: number; branchName: string }) => ({
          task_id: Number(id),
          repo_id: repo.repoId,
          task_branch_name: repo.branchName,
        }));
        await TaskRepoService.createTaskRepo(taskRepo); 
      }

      if (users) {
        const userTasks = users.map((user: { userId: number; roleId: number }) => ({
          user_id: user.userId,
          role_id: user.roleId,
          task_id: Number(id),
        }));
        await UserTaskService.createUserTasks(userTasks);
      }
      res.status(200).json({ message: "Task updated successfully" });
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown Message";
    res.status(400).json({ error: message });
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
