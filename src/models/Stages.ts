import { CreationOptional, DataTypes, InferAttributes, Model } from "sequelize";
import { sequelize } from "../db/sequelize";

export class Stages extends Model<InferAttributes<Stages>> {
  declare id?: CreationOptional<number>;
  declare name: String;
  declare description: String;
  declare createdAt?: CreationOptional<Date>;
  declare updatedAt?: CreationOptional<Date>;
}

Stages.init(
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
    modelName: "Stages",
    tableName: "stages",
    timestamps: true,
  }
);
