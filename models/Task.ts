import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db/sequelize";
import { Repo } from "./Repo";
import { UserTask } from "./User_task";


export class Task extends Model {
  declare id: Number;
  declare name: String;
  declare description: String;
  declare repo_id: Repo["id"];
  declare task_branch_name: String;
  declare estimate_Date:Date;
  
}

Task.init(
  {
    id: {
      type: DataTypes.NUMBER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    estimate_Date:{
        type:DataTypes.DATE,
        allowNull:false,
    },
  },
  {
    sequelize,
    modelName: "Task",
    tableName: "task",
    timestamps:true,
  }
);

Task.hasMany(UserTask,{foreignKey:"task_id"});
UserTask.belongsTo(Task,{foreignKey:"id"});