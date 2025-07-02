
import { UserTask } from "../models/UserTask";

class UserTaskService{
    async createUserTasks(userTasks: {
        task_id:number,
        user_id:number,
        role_id:number,
    }[] ){
        return await UserTask.bulkCreate(userTasks);
    }
    async getAllUserTask(){
        return await UserTask.findAll();
    }
    async getUserTaskById(id: string){
        return await UserTask.findByPk(id);
    }
    async updateUserTask(id:string,updatedData:UserTask){
        const userTask = await UserTask.findByPk(id);
        if(!userTask) throw new Error("User Task Not Found");
        return await userTask.update(updatedData);
    }
    async deleteUserTask(id:string){
        const userTask = await UserTask.findByPk(id);
        if(!userTask) throw new Error("User Task Not found");
        await userTask.destroy();
        return true;
    }
}

export default new UserTaskService();