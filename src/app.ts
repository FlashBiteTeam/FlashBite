import { Server } from "./presentation/server";
import { AppRoutes } from "./presentation/routes";
import {envs} from './config/envs';



(()=>{
    main();
})()

async function main(){
    const serverExpress = new Server({
        port: envs.PORT,
        routes: AppRoutes.routes    
    })

    serverExpress.start();
}