import { sequelize } from "../db/sequelize";
import { TaskData } from "../interfaces/task";
import { Role } from "../models/Role";
import { Stages } from "../models/Stages";
import { Task } from "../models/Task";
import { User } from "../models/User";
import { UserTask } from "../models/UserTask";

class TaskService {
  async createTask(task: TaskData) {
    return await Task.create({
      name: task.name,
      description: task.description,
      estimatedDate: task.estimatedDate,
      stage_id: task.stageId,
    });
  }
  async getAllTask() {
    return await Task.findAll({
      order: [["stage_id", "DESC"]],
      include: [
        {
          model: UserTask,
          as: "userTasks",
          include: [
            {
              model: User,
              attributes: ["name"],
              as: "user",
            }
          ]
        }
      ]
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
  async updateTask(id: string, data: TaskData) {
    const task = await Task.findByPk(id);
    if (!task) throw new Error("Task Not Found");
    return await task.update(data);
  }
  async deleteTask(id: string) {
    const task = await Task.findByPk(id);
    if (!task) throw new Error("Task Not Found");
    await task.destroy();
    return true;
  }
}

export default new TaskService();
