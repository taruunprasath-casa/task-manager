import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db/sequelize";
import { Task } from "./Task";
import { Stages } from "./Stages";


export class TaskStatus extends Model {
    declare id: Number;
    declare name: String;
    declare task_id: Task["id"];
    declare stage_id: Stages["id"];
}

TaskStatus.init({
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
}, {
    sequelize,
    modelName: 'TaskStatus',
    tableName: 'task_status',
    timestamps: true,
});
