import {
  CreationOptional,
  DataTypes,
  Model,
  ForeignKey,
  InferAttributes,
} from "sequelize";
import { sequelize } from "../db/sequelize";
import { User } from "./User";
import { Task } from "./Task";

export class TaskComments extends Model<InferAttributes<TaskComments>> {
  declare id?: CreationOptional<number>;
  declare user_id: ForeignKey<User["id"]>;
  declare task_id: ForeignKey<Task["id"]>;
  declare task_updates: String;
  declare createdAt?: CreationOptional<Date>;
  declare updatedAt?: CreationOptional<Date>;
}

TaskComments.init(
  {
    task_updates: {
      type: DataTypes.STRING,
      allowNull: false,
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
    modelName: "TaskComments",
    tableName: "task_comments",
    timestamps: true,
  }
);

Task.hasOne(TaskComments, { foreignKey: "task_id", onDelete: "CASCADE" });
TaskComments.belongsTo(Task, { foreignKey: "task_id", onDelete: "CASCADE" });
