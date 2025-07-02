import { TaskRepo } from "../models/TaskRepo";

class TaskRepoService{
    async createTaskRepo(taskService:{
        task_id:number;
        repo_id:number;
        task_branch_name:string;
        
    }[]){
        return await TaskRepo.bulkCreate(taskService); 
    }
}

export default new TaskRepoService();