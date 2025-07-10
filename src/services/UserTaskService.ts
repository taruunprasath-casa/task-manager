import { Transaction } from "sequelize";
import { UserTask } from "../models/UserTask";
import { userTaskData } from "../interfaces/user";
class UserTaskService {
  async createUserTasks(
    userTaskData: userTaskData[],
    transaction?: Transaction
  ) {
    return await UserTask.bulkCreate(userTaskData, {
      updateOnDuplicate: ["role_id", "updatedAt"],
      transaction,
    });
  }
  async getAllUserTask() {
    return await UserTask.findAll();
  }
  async getUserTaskById(id: string) {
    return await UserTask.findByPk(id);
  }
  async deleteUserTask(transaction: Transaction, userTaskData: UserTask[]) {
    return userTaskData.map(async (userTask) => {
      await UserTask.destroy({
        where: {
          task_id: userTask.task_id,
          user_id: userTask.user_id,
          role_id: userTask.role_id,
        },
        transaction,
      });
    });
  }

  async handleUserTasks(
    transaction: Transaction,
    userTaskData: userTaskData[],
    userId: number
  ) {
    await this.createUserTasks(userTaskData,transaction);

    const userTaskExistingData = await UserTask.findAll({
      where: { user_id: userId },
      transaction,
    });

    const removeUserTasks = userTaskExistingData.filter(
      (existingData) =>
        !userTaskData.some(
          (data) =>
            data.user_id === existingData.user_id &&
            data.task_id === existingData.task_id
        )
    );
    await this.deleteUserTask(
      transaction,
      removeUserTasks
    );
  }
}

export default new UserTaskService();
