import { Router } from "express";
import { AuthRoutes } from "./auth/routes";
import { SearchRoutes } from "./search/routes";
import { ReservasRoutes } from "./reservas/routes";
import { ImageRouter } from "./images/router";
import { MenuRoutes } from "./menu/routes";
import { GestionRouter } from "./gestion/router";

export class AppRoutes{

    static get routes():Router{
    
        const router = Router();

        router.use('/api/flashbite/auth', AuthRoutes.routes);
        router.use('/api/flashbite/search', SearchRoutes.routes);
        router.use('/api/flashbite/reservas', ReservasRoutes.routes);
        router.use('/api/flashbite/imagenes', ImageRouter.routes);
        router.use('/api/flashbite/menu', MenuRoutes.routes);
        router.use('/api/flashbite/gestion', GestionRouter.routes);

        return router;
    }
}