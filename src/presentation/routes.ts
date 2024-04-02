import { Router } from "express";
import { AuthRoutes } from "./auth/routes";
import { SearchRoutes } from "./search/routes";

export class AppRoutes{

    static get routes():Router{
    
        const router = Router();

        router.use('/api/flashbite', AuthRoutes.routes);
        router.use('/api/flashbite', SearchRoutes.routes);

        return router;
    }
}