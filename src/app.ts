import { Server } from "./presentation/server";
import { AppRoutes } from "./presentation/routes";
import {envs} from './config/envs';
import { dbConnection , MongoDatabase } from "./data";



(()=>{
    main();
})()

async function main(){
    const serverExpress = new Server({
        port: envs.PORT,
        routes: AppRoutes.routes    
    })

    serverExpress.start();

    await MongoDatabase.connect({
        dbName:envs.MONGO_DB_NAME,
        mongoUrl:envs.MONGO_URL,
    })
  
    await dbConnection();
   
}