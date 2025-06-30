import { CreationOptional, DataTypes, InferAttributes, Model } from "sequelize";
import { sequelize } from "../db/sequelize";
import { UserTask } from "./UserTask";


export class Task extends Model<InferAttributes<Task>> {
  declare id?: CreationOptional<number>;
  declare name: String;
  declare description: String;
  declare estimatedDate?:Date;
  declare userTasks?:UserTask[];
  
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
    estimatedDate:{
        type:DataTypes.DATE,
        allowNull:true,
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