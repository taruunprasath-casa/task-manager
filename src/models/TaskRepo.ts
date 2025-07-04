import { CreationOptional, DataTypes, ForeignKey, InferAttributes, Model } from "sequelize";
import { sequelize } from "../db/sequelize";
import { Task } from "./Task";
import { Repo } from "./Repo";

export class TaskRepo extends Model<InferAttributes<TaskRepo>>{
    declare id?: CreationOptional<number>;
    declare task_id: ForeignKey<Task["id"]>;
    declare repo_id: ForeignKey<Repo["id"]>;
    declare task_branch_name: String;
    declare createdAt?:CreationOptional<Date>;
    declare updatedAt?:CreationOptional<Date>;
    
}

TaskRepo.init({
    id:{
        type:DataTypes.NUMBER,
        primaryKey:true,
        autoIncrement:true,
    },
    task_branch_name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    createdAt: {
      type: DataTypes.DATE(3),
      defaultValue: sequelize.literal("current_timestamp(3)"),
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE(3),
      defaultValue: sequelize.literal("current_timestamp(3)"),
      allowNull: false,
    },
},
    {
        sequelize,
        tableName:"task_repo",
        modelName:"taskrepo",
        timestamps:true,
    }
);

