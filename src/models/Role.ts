import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db/sequelize";

export class Role extends Model{
    declare id:Number;
    declare name:String;
}

Role.init({
    id:{
        type:DataTypes.NUMBER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true,
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
    }

},
{
    sequelize,
    modelName:'Role',
    tableName:'role',
    timestamps: false,
}
);

