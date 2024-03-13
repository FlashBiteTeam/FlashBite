import { Server } from "./presentation/server";
import { AppRoutes } from "./presentation/routes";
import {envs} from './config/envs';
import { MySQLDatabase } from "./data/mysql/mysql-database";



(()=>{
    main();
})()

async function main(){
    const serverExpress = new Server({
        port: envs.PORT,
        routes: AppRoutes.routes    
    })

    serverExpress.start();

    const sequelize = await MySQLDatabase.connect({
        dbName: envs.MYSQL_DB,
        username: envs.MYSQL_USERNAME,
        password: envs.MYSQL_ROOT_PASSWORD,
        host: envs.MYSQL_HOST,
        port: envs.MYSQL_PORT,
    });
}