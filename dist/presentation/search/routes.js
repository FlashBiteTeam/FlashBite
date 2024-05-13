"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const restaurante_repository_impl_1 = require("../../infrastructure/repositories/restaurante.repository.impl");
const mysql_restaurante_datasource_1 = require("../../infrastructure/datasources/mysql-restaurante.datasource");
class SearchRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const restauranteDatasource = new mysql_restaurante_datasource_1.MysqlRestauranteDatasource();
        const restauranteRepository = new restaurante_repository_impl_1.RestauranteRepositoryImpl(restauranteDatasource);
        const controllerSearch = new controller_1.SearchController(restauranteRepository);
        router.get('/restaurante/all', controllerSearch.getAll);
        router.get('/restaurante/:id', controllerSearch.getRestauranteById);
        return router;
    }
}
exports.SearchRoutes = SearchRoutes;
