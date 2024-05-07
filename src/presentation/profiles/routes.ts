import { Router } from "express";
import { ProfileController } from "./controller";

export class ProfileRoutes{

    static get routes():Router{
        const router = Router();

        const profileController = new ProfileController;

        router.put('/edit/user', profileController.editUserInfo)
        router.put('/edit/restaurant', profileController.editRestaurantInfo)
        router.get('/get/user/:email', profileController.getUser)


        return router;
    }
}