import { Router } from "express";
import { AuthRoutes } from "./auth/routes";
import { SearchRoutes } from "./search/routes";

export class AppRoutes{

    static get routes():Router{
    
        const router = Router();

        router.use('/api/flashbite/auth', AuthRoutes.routes);
        router.use('/api/flashbite/search', SearchRoutes.routes);

        return router;
    }
}