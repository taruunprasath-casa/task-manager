import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("task", "taruun", "123456", {
  host: "localhost",
  dialect: "postgres",
});

