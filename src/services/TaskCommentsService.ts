import { TaskCommentData } from "../interfaces/taskComments";
import { TaskComments } from "../models/TaskComments";

class TaskCommentsService{
    async createTaskComments(taskCommentData:TaskCommentData,taskId:number){
        return await TaskComments.create({
            task_updates:taskCommentData.taskUpdates,
            task_id:taskId,
            user_id:taskCommentData.userId,
        })
    }

    async getAllTaskComments(){
        return await TaskComments.findAll();
    }
    async updateTaskComments(taskId:number, taskCommentData:TaskCommentData, commentId?: number) {
        return await TaskComments.update({
            task_updates: taskCommentData.taskUpdates,
            user_id: taskCommentData.userId,
        }, {
            where: { task_id: taskId, id: commentId },
            returning: true,
        });
    }
    async getTaskCommentsByTaskId(taskId: number) {
        return await TaskComments.findAll({
            where: { task_id: taskId },
        });
    }
    async deleteTaskCommentById(commentId: number) {
        return await TaskComments.destroy({
            where: { id: commentId },
        });
    }
}

export default new TaskCommentsService();