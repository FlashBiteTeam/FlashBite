"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageRouter = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const multer_1 = __importDefault(require("multer"));
class ImageRouter {
    static get routes() {
        const upload = (0, multer_1.default)();
        const router = (0, express_1.Router)();
        const imageController = new controller_1.ImageController();
        router.post('/restaurante', upload.single("file"), imageController.restauranteImg);
        router.post('/usuarios', upload.single("file"), imageController.usuariosImg);
        router.get('/restaurante/:email', imageController.getBlobRestaurantes);
        router.get('/usuarios/:email', imageController.getBlobUsuarios);
        return router;
    }
}
exports.ImageRouter = ImageRouter;
