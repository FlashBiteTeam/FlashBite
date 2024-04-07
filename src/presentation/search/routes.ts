import { Router } from "express";
import { SearchController } from "./controller";
import { RestauranteRepositoryImpl } from "../../infrastructure/repositories/restaurante.repository.impl";
import { MysqlRestauranteDatasource } from "../../infrastructure/datasources/mysql-restaurante.datasource";

export class SearchRoutes{

    static get routes():Router{

        const router = Router();

        const restauranteDatasource = new MysqlRestauranteDatasource();
        const restauranteRepository = new RestauranteRepositoryImpl(restauranteDatasource);
        const controllerSearch = new SearchController(restauranteRepository);

        router.get('/restaurante/all',controllerSearch.getAll)
        router.get('/restaurante/:id',controllerSearch.getRestauranteById)

        return router;
    }

}