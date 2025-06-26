import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db/sequelize";
import { UserTask } from "./User_task";

export class User extends Model{
    declare id:Number;
    declare name:String;
}

User.init({
    id:{
        type: DataTypes.NUMBER,
        allowNull: false,
        primaryKey:true,
        autoIncrement:true,
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
},
{
    sequelize,
    modelName:'User',
    tableName:'users',
}
);
User.hasMany(UserTask,{foreignKey:"user_id"});
UserTask.belongsTo(User,{foreignKey:"id"});