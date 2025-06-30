import { TaskData } from "../interfaces/task";
import { Task } from "../models/Task";

class TaskService {
  async createTask(task: TaskData) {
    return await Task.create(
      {
        name: task.name,
        description: task.description,
        estimatedDate: task.estimatedDate,
      },
      {
        include: [
          {
            include: [Task],
          },
        ],
      }
    );
  }
  async getAllTask() {
    return await Task.findAll();
  }
  async getTaskById(id: string): Promise<any> {
    return await Task.findByPk(id);
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
