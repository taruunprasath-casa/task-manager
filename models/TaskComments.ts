import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db/sequelize";
import { User } from "./User";
import { Task } from "./Task";
import { Role } from "./Role";

export class TaskComments extends Model{
    declare user_id:User["id"];
    declare task_id:Task["id"];
    declare task_updates:String
    
}

TaskComments.init({
    task_updates:{
        type:DataTypes.STRING,
        allowNull:false,
    },
},
    {
        sequelize,
        modelName:'Usertask',
        tableName:'usertask',
        timestamps:true,
    }
)