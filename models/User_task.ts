import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db/sequelize";
import { User } from "./User";
import { Task } from "./Task";
import { Role } from "./Role";

export class UserTask extends Model{
    declare user_id:User["id"];
    declare task_id:Task["id"];
    declare role_id:Role["id"];
    declare task_updates:String;
    
}

UserTask.init({
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