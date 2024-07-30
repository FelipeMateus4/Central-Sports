import { Sequelize } from 'sequelize';
import { config } from 'dotenv';
import { log } from 'console';

config();

const sequelize = new Sequelize(
    process.env.DATABASE as string,
    process.env.USER as string,
    process.env.PASSWORD as string,
    {
        host: 'localhost',
        dialect: 'postgres',
    }
);

console.log(process.env.DATABASE);

export default sequelize;
