import { CreationOptional, DataTypes, ForeignKey, InferAttributes, Model } from "sequelize";
import { sequelize } from "../db/sequelize";
import { Repo } from "./Repo";
import { UserTask } from "./UserTask";


export class Task extends Model<InferAttributes<Task>> {
  declare id?: CreationOptional<number>;
  declare name: String;
  declare description: String;
  declare estimate_Date:Date;
  
}

Task.init(
  {
    id: {
      type: DataTypes.NUMBER,
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