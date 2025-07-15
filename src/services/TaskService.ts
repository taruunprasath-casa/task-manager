import { Op, Transaction, where, WhereOptions } from "sequelize";
import { TaskData, TaskFilters, TaskUpdateData } from "../interfaces/task";
import { Role } from "../models/Role";
import { Stages } from "../models/Stages";
import { Task } from "../models/Task";
import { User } from "../models/User";
import { UserTask } from "../models/UserTask";
import { sequelize } from "../db/sequelize";
import TaskRepoService from "./TaskRepoService";
import { userTaskData } from "../interfaces/user";
import UserTaskService from "./UserTaskService";
import { TaskRepo } from "../models/TaskRepo";
import { Repo } from "../models/Repo";
import { TaskComments } from "../models/TaskComments";

class TaskService {
  async createTask(task: TaskData, transaction?: Transaction) {
    return await Task.create(
      {
        name: task.name,
        description: task.description,
        estimatedDate: task.estimatedDate,
        stage_id: task.stageId,
      },
      {
        returning: true,
        transaction,
      }
    );
  }
  async getAllTask(taskFilters: TaskFilters) {
    const userIds = taskFilters?.userIds;
    const fromEstimatedDate = taskFilters?.fromEstimatedDate;
    const toEstimatedDate = taskFilters?.toEstimatedDate;
    const orderBy = taskFilters?.orderBy;
    const orderDirection = taskFilters?.orderDirection;
    const search = taskFilters?.search;

    const userTaskWhere: WhereOptions = {};
    let taskWhereConditions: WhereOptions = {};
    let userSearchWhere: WhereOptions = {};
    let taskCommentSearchWhere: WhereOptions = {};

    if (userIds && userIds.length > 0) {
      userTaskWhere.user_id = {
        [Op.in]: userIds,
      };
    }

    if (fromEstimatedDate && toEstimatedDate) {
      taskWhereConditions.estimatedDate = {
        [Op.between]: [fromEstimatedDate, toEstimatedDate],
      };
    }

    if (search) {
      taskWhereConditions = {
        ...taskWhereConditions,

        [Op.or]: [
          {
            name: {
              [Op.iLike]: `%${search}%`,
            },
          },
          {
            description: {
              [Op.iLike]: `%${search}%`,
            },
          },
          sequelize.where(
            sequelize.col("userTasks->user.name"),
            "ilike",
            "%" + search + "%"
          ),
          sequelize.where(
            sequelize.col("taskrepos->repo.name"),
            "ilike",
            "%" + search + "%"
          ),
          sequelize.where(
            sequelize.col("taskComments.task_updates"),
            "ilike",
            "%" + search + "%"
          ),
        ],
      } as WhereOptions<Task>;
    }



    const order: any =
      orderBy && orderDirection
        ? [[orderBy, orderDirection]]
        : [["updatedAt", "DESC"]];

    return await Task.findAll({
      order: [order],
      where: taskWhereConditions,
      logging: true,
      include: [
        {
          model: UserTask,
          attributes: ["createdAt", "updatedAt"],
          as: "userTasks",
          where: userTaskWhere,
          include: [
            {
              model: User,
              attributes: ["name"],
              as: "user",
              where: userSearchWhere,
            },
          ],
        },
        {
          model: TaskRepo,
          include: [
            {
              model: Repo,
              attributes: ["name"],
              as: "repo",
            },
          ],
        },
        {
          model: TaskComments,
          attributes: ["task_updates", "createdAt"],
          as: "taskComments",
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
        {
          model: TaskComments,
          attributes: ["task_updates", "createdAt"],
          as: "taskComments",
        },
      ],
    });
  }
  async updateTaskTransactionService(taskData: TaskData, taskId: number) {
    await sequelize.transaction(async (t) => {
      const updatedTask: TaskUpdateData = {
        name: taskData.name,
        description: taskData.description,
        stage_id: taskData.stageId,
      };
      await this.updateTask(t, updatedTask, taskId);
      const mappedTaskRepo =
        taskData.repos?.map((repo) => ({
          repo_id: Number(repo.repoId),
          task_branch_name: String(repo.branchName),
          task_id: Number(taskId),
        })) || [];
      await TaskRepoService.handleUpdateTaskRepos(t, mappedTaskRepo, taskId);
      const mappedUserTask: userTaskData[] = taskData.users.map((userTask) => ({
        user_id: userTask.userId,
        role_id: userTask.roleId,
        task_id: taskId,
      }));
      await UserTaskService.handleUserTasks(t, mappedUserTask, taskId);
    });
  }

  async createTaskTransaction(taskData: TaskData) {
    return await sequelize.transaction(async (t) => {
      const createdTask = await this.createTask(taskData, t);

      const userTasks = taskData.users.map((user) => ({
        user_id: user.userId,
        role_id: user.roleId,
        task_id: Number(createdTask.id),
      }));
      await UserTaskService.createUserTasks(userTasks, t);

      if (taskData.repos) {
        const taskRepo = taskData.repos.map((repo) => ({
          task_id: Number(createdTask.id),
          repo_id: repo.repoId,
          task_branch_name: repo.branchName,
        }));
        await TaskRepoService.createTaskRepo(taskRepo, t);
      }

      return createdTask;
    });
  }

  async updateTask(t: Transaction, taskData: TaskUpdateData, taskId: number) {
    return await Task.update(taskData, {
      where: {
        id: taskId,
      },
      transaction: t,
    });
  }
  async deleteTask(id: string) {
    const task = await Task.findByPk(Number(id));
    if (!task) throw new Error("Task Not Found");
    await task.destroy();
    return true;
  }
}

export default new TaskService();
