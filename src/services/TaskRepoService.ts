import { Transaction } from "sequelize";
import { TaskRepo } from "../models/TaskRepo";
import { TaskRepoData } from "../interfaces/task";

class TaskRepoService {
  async createTaskRepo(
    taskRepoData: TaskRepoData[],
    transaction?: Transaction
  ) {
    return await TaskRepo.bulkCreate(taskRepoData, {
      updateOnDuplicate: ["repo_id", "task_branch_name", "updatedAt"],
      transaction,
    });
  }

  async deleteTaskRepo(transaction: Transaction, taskRepoData: TaskRepo[]) {
    return taskRepoData.map(async (taskRepo) => {
      await TaskRepo.destroy({
        where: { task_id: taskRepo.task_id, repo_id: taskRepo.repo_id },
        transaction,
      });
    });
  }
  async handleUpdateTaskRepos(
    t: Transaction,
    taskRepos: TaskRepoData[],
    taskId: number
  ) {
    this.createTaskRepo(taskRepos, t);
    const taskRepoExistingData = await TaskRepo.findAll({
      where: { task_id: taskId },
    });
    const removedTaskRepos = taskRepoExistingData.filter(
      (existingData) =>
        !taskRepos.some(
          (data) =>
            data.repo_id == existingData.repo_id &&
            data.task_id == existingData.task_id
        )
    );
    await this.deleteTaskRepo(t, removedTaskRepos);
  }
}

export default new TaskRepoService();
