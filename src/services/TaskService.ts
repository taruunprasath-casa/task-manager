import { Op, Transaction } from "sequelize";
import { TaskData, TaskFilters, TaskUpdateData } from "../interfaces/task";
import { Role } from "../models/Role";
import { Stages } from "../models/Stages";
import { Task } from "../models/Task";
import { User } from "../models/User";
import { UserTask } from "../models/UserTask";
import { sequelize } from "../db/sequelize";
import TaskRepoService from "./TaskRepoService";

class TaskService {
  async createTask(task: TaskData) {
    return await Task.create({
      name: task.name,
      description: task.description,
      estimatedDate: task.estimatedDate,
      stage_id: task.stageId,
    });
  }
  async getAllTask(taskFilters: TaskFilters) {
    return await Task.findAll({
      order: [["stage_id", "DESC"]],
      include: [
        {
          model: UserTask,
          as: "userTasks",
          where: { user_id: { [Op.in]: taskFilters } },
          include: [
            {
              model: User,
              attributes: ["name"],
              as: "user",
            },
          ],
        },
      ],
    });
  }
  async getTaskById(id: string): Promise<any> {
    return await Task.findByPk(id, {
      include: [
        {
          model: UserTask,
          as: "userTasks",
          attributes: ["task_id", "user_id", "role_id"],
          include: [
            {
              model: User,
              attributes: ["id", "name"],
              as: "user",
            },
            {
              model: Role,
              attributes: ["id", "name"],
              as: "role",
            },
          ],
        },
        {
          model: Stages,
          attributes: ["id", "name"],
        },
      ],
    });
  }
  async updateTaskTransactionService  (
  taskData: TaskData,
  taskId: number
) {
  await sequelize.transaction(async (t) => {
    const updatedTask: TaskUpdateData = {
      id: taskId,
      name: taskData.name,
      description: taskData.description,
      stage_id: taskData.stageId,
    };
    await this.updateTask(t, updatedTask, taskId);
    const mappedTaskRepo = taskData.repos?.map((repo) => ({
      repo_id: Number(repo.repoId),
      task_branch_name: String(repo.branchName),
      task_id: Number(taskId),
    })) || [];
    await TaskRepoService.handleUpdateTaskRepos(t, mappedTaskRepo, taskId);
  });
};

async updateTask (
  t: Transaction,
  taskData: TaskUpdateData,
  taskId: number
){
  return await Task.update(taskData, {
    where: {
      id: taskId,
    },
    transaction: t,
  });
};
  async deleteTask(id: string) {
    const task = await Task.findByPk(Number(id));
    if (!task) throw new Error("Task Not Found");
    await task.destroy();
    return true;
  }
}

export default new TaskService();
