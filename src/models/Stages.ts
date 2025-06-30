import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db/sequelize";


export class Stages extends Model {
  declare id: Number;
  declare name: String;
  declare description: String;

}

Stages.init({
  id: {
    type: DataTypes.NUMBER,
    allowNull:false,
    primaryKey:true,
    autoIncrement:true,
  },
  name:{
    type: DataTypes.STRING,
    allowNull:false,
  },
  description:{
    type: DataTypes.STRING,
    allowNull:false,
  },
},
{
    sequelize,
    modelName:'Stages',
    tableName:'stages',
    timestamps:true,
});
