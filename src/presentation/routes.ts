import { Router } from "express";
import { AuthRoutes } from "./auth/routes";
import { SearchRoutes } from "./search/routes";
import { ReservasRoutes } from "./reservas/routes";

export class AppRoutes{

    static get routes():Router{
    
        const router = Router();

        router.use('/api/flashbite/auth', AuthRoutes.routes);
        router.use('/api/flashbite/search', SearchRoutes.routes);
        router.use('/api/flashbite/reservas', ReservasRoutes.routes);

        return router;
    }
}