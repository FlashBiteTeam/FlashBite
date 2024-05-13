"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const mysql_restaurante_datasource_1 = require("../../infrastructure/datasources/mysql-restaurante.datasource");
const restaurante_repository_impl_1 = require("../../infrastructure/repositories/restaurante.repository.impl");
class MenuRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const restauranteDatasource = new mysql_restaurante_datasource_1.MysqlRestauranteDatasource();
        const restauranteRepository = new restaurante_repository_impl_1.RestauranteRepositoryImpl(restauranteDatasource);
        const controllerMenu = new controller_1.MenuController(restauranteRepository);
        router.post('/add/plate', controllerMenu.addPlate);
        router.get('/get/types/:id', controllerMenu.getTypes);
        router.get('/get/plates/:id/:type', controllerMenu.getPlates);
        router.delete('/delete/plate', controllerMenu.deletePlate);
        return router;
    }
}
exports.MenuRoutes = MenuRoutes;
