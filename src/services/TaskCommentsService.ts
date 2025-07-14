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
}

export default new TaskCommentsService();