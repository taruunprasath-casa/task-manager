import { DataTypes, InferAttributes, Model, CreationOptional } from "sequelize";
import { sequelize } from "../db/sequelize";

export class User extends Model<InferAttributes<User>>{
    declare id?:CreationOptional<number>;
    declare name:String; 
    declare createdAt?:CreationOptional<Date>;
    declare updatedAt?:CreationOptional<Date>;
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
    modelName:'User',
    tableName:'users',
    timestamps: true,
    
}
);
