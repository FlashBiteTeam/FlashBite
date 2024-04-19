import { Router } from "express";
import { ImageController } from "./controller";
import multer from 'multer';

export class ImageRouter{

    static get routes():Router{
        const upload = multer();
        const router = Router();

        const imageController = new ImageController();

        router.post('/restaurante', upload.single("file"), imageController.restauranteImg)
        router.post('/usuarios', upload.single("file"), imageController.usuariosImg)

        router.get('/restaurante/:email', imageController.getBlobRestaurantes)
        router.post('/usuarios/:email', imageController.getBlobUsuarios)

        return router;

    }

}