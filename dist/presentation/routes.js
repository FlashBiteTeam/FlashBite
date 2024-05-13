"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoutes = void 0;
const express_1 = require("express");
const routes_1 = require("./auth/routes");
const routes_2 = require("./search/routes");
const routes_3 = require("./reservas/routes");
const router_1 = require("./images/router");
const routes_4 = require("./menu/routes");
const router_2 = require("./gestion/router");
const routes_5 = require("./profiles/routes");
class AppRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        router.use('/api/flashbite/auth', routes_1.AuthRoutes.routes);
        router.use('/api/flashbite/search', routes_2.SearchRoutes.routes);
        router.use('/api/flashbite/reservas', routes_3.ReservasRoutes.routes);
        router.use('/api/flashbite/imagenes', router_1.ImageRouter.routes);
        router.use('/api/flashbite/menu', routes_4.MenuRoutes.routes);
        router.use('/api/flashbite/gestion', router_2.GestionRouter.routes);
        router.use('/api/flashbite/profile', routes_5.ProfileRoutes.routes);
        return router;
    }
}
exports.AppRoutes = AppRoutes;
