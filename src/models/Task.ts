import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "../db/sequelize";
import { Stages } from "./Stages";

export class Task extends Model<InferAttributes<Task>,InferCreationAttributes<Task>> {
  declare id?: CreationOptional<number>;
  declare name: String;
  declare description: String;
  declare estimatedDate?: Date;
  declare stage_id: ForeignKey<Stages["id"]>;
  declare createdAt?: CreationOptional<Date>;
  declare updatedAt?: CreationOptional<Date>;
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
    estimatedDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "estimated_date",
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
    modelName: "Task",
    tableName: "tasks",
    timestamps: false,
  }
);

Stages.hasMany(Task, { foreignKey: "stage_id" });
Task.belongsTo(Stages, { foreignKey: "stage_id" });
