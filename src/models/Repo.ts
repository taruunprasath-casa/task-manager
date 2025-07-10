import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db/sequelize";


export class Repo extends Model{
    declare id:Number;
    declare name:String;
}

Repo.init({
    id:{
        type:DataTypes.NUMBER,
        allowNull:false,
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
    modelName:'Repo',
    tableName:'repo',
    timestamps: false,
});

