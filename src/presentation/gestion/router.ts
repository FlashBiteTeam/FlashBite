import { Router } from "express";
import { GestionController } from "./controller";

export class GestionRouter{

    static get routes():Router{
        const router = Router();

        const gestionController = new GestionController;

        router.get('/get/users', gestionController.getUsers)
        router.get('/get/restaurants', gestionController.getRestaurants)
        router.delete('/delete/user', gestionController.deleteUser)
        router.delete('/delete/restaurant', gestionController.deleteRestaurant)


        return router;
    }
}