import { Sequelize } from "sequelize";
import { envs } from "../../config/envs";


export const db = new Sequelize(envs.MYSQL_DB, envs.MYSQL_USERNAME, envs.MYSQL_ROOT_PASSWORD,{
    host: envs.MYSQL_HOST,
    port: 3306,
    dialect: 'mysql',
});

export const  dbConnection = async ()=>{

    try {
        await db.authenticate();
        await db.sync({alter: true})
        console.log('Database online');
    } catch (error) {
        throw error;
    }
}
