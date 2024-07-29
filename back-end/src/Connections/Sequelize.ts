import { Sequelize } from "sequelize";
import { config } from "dotenv";

config();

const sequelize = new Sequelize(
    process.env.DATABASE as string,
    process.env.USERNAME as string,
    process.env.PASSWORD as string,
    {
        host: "localhost",
        dialect: "postgres",
    }
);
