import { Server } from "./presentation/server";
import { AppRoutes } from "./presentation/routes";
import {envs} from './config/envs';
import { dbConnection } from "./data";



(()=>{
    main();
})()

async function main(){
    const serverExpress = new Server({
        port: envs.PORT,
        routes: AppRoutes.routes    
    })

    serverExpress.start();

    
  
    await dbConnection();
   
}