import { Router } from "express";
import { ProfileController } from "./controller";

export class ProfileRoutes{

    static get routes():Router{
        const router = Router();

        const profileController = new ProfileController;

        // router.post('/edit/user', profileController.editUserInfo)
        router.post('/edit/restaurant', profileController.editRestaurantInfo)


        return router;
    }
}