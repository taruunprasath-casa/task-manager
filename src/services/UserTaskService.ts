import { Transaction } from "sequelize";
import { UserTask } from "../models/UserTask";
import { UserTaskData } from "../interfaces/user";
import { sequelize } from "../db/sequelize";

class UserTaskService {
  async createUserTasks(
    userTasks: {
      task_id: number;
      user_id: number;
      role_id: number;
    }[]
  ) {
    return await UserTask.bulkCreate(userTasks);
  }
  async getAllUserTask() {
    return await UserTask.findAll();
  }
  async getUserTaskById(id: string) {
    return await UserTask.findByPk(id);
  }
  async deleteUserTask(transaction: Transaction, userTaskData: UserTaskData[]) {
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

  async updateUserTaskService(userTaskData: UserTaskData[], userId: number) {
    const mappedUserTask = userTaskData.map((userTask) => ({
      task_id: Number(userTask.task_id),
      user_id: Number(userTask.user_id),
      role_id: Number(userTask.role_id),
    }));

    await sequelize.transaction(async (t) => {
      for (const userTask of mappedUserTask) {
        await this.updateUserTask(t, userTask, userTask.user_id);
      }

      await this.createUserTasks(mappedUserTask);

      const userTaskExistingData = await UserTask.findAll({
        where: { user_id: userId },
        transaction: t,
      });

      const removeUserTasks = userTaskExistingData.filter(
        (existingData) =>
          !mappedUserTask.some(
            (data) =>
              data.user_id === existingData.user_id &&
              data.task_id === existingData.task_id
          )
      );
      await this.deleteUserTask(
        t,
        removeUserTasks.map((task) => ({
          task_id: task.task_id as number,
          user_id: task.user_id as number,
          role_id: task.role_id as number,
        }))
      );
    });
  }

  async updateUserTask(
    t: Transaction,
    userTaskData: UserTaskData,
    userId: number
  ) {
    return await UserTask.update(userTaskData, {
      where: {
        user_id: userId,
      },
      transaction: t,
    });
  }
}

export default new UserTaskService();
