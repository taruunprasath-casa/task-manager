import { DataTypes, InferAttributes, Model, CreationOptional } from "sequelize";
import { sequelize } from "../db/sequelize";
import { UserTask } from "./UserTask";

export class User extends Model<InferAttributes<User>>{
    declare id?:CreationOptional<number>;
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
    timestamps: false,
}
);
User.hasMany(UserTask,{foreignKey:"user_id"});
UserTask.belongsTo(User,{foreignKey:"id"});