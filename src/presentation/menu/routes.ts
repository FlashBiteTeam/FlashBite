import { Router } from "express";
import { MenuController } from "./controller";
import { MysqlRestauranteDatasource } from "../../infrastructure/datasources/mysql-restaurante.datasource";
import { RestauranteRepositoryImpl } from "../../infrastructure/repositories/restaurante.repository.impl";

export class MenuRoutes{

    static get routes():Router{

        const router = Router();

        const restauranteDatasource = new MysqlRestauranteDatasource();
        const restauranteRepository = new RestauranteRepositoryImpl(restauranteDatasource);
        const controllerMenu = new MenuController(restauranteRepository);

        router.post('/add/plate',controllerMenu.addPlate);
        router.get('/get/types',controllerMenu.getTypes)
        router.get('/get/plates',controllerMenu.getPlates)
        router.delete('/delete/plate',controllerMenu.deletePlate)



        return router;
    }

}