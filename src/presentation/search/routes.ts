import { Router } from "express";
import { SearchController } from "./controller";

export class SearchRoutes{

    static get routes():Router{

        const router = Router();


        const controller = new SearchController();

        router.get('restaurantes/all',controller.getAll)

        return router;
    }

}