"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GestionRouter = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
class GestionRouter {
    static get routes() {
        const router = (0, express_1.Router)();
        const gestionController = new controller_1.GestionController;
        router.get('/get/users', gestionController.getUsers);
        router.get('/get/restaurants', gestionController.getRestaurants);
        router.delete('/delete/user', gestionController.deleteUser);
        router.delete('/delete/restaurant', gestionController.deleteRestaurant);
        return router;
    }
}
exports.GestionRouter = GestionRouter;
