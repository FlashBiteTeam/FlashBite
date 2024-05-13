"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
class ProfileRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const profileController = new controller_1.ProfileController;
        router.put('/edit/user', profileController.editUserInfo);
        router.put('/edit/restaurant', profileController.editRestaurantInfo);
        router.get('/get/user/:email', profileController.getUser);
        return router;
    }
}
exports.ProfileRoutes = ProfileRoutes;
