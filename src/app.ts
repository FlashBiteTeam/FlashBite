import { Server } from "./presentation/server";
import { AppRoutes } from "./presentation/routes";
import {envs} from './config/envs';
import {  dbConnection  } from "./data";



(()=>{
    main();
})()

async function main(){
    const serverExpress = new Server({
        port: envs.PORT,
        routes: AppRoutes.routes    
    })

    serverExpress.start();
    console.log(envs.MYSQL_HOST,envs.MYSQL_ROOT_PASSWORD, envs.MYSQL_PORT);
    
    
   

    await dbConnection();
  
}