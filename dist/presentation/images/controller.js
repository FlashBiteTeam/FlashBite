"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageController = void 0;
const storage_blob_1 = require("@azure/storage-blob");
const envs_1 = require("../../config/envs");
const blobService = storage_blob_1.BlobServiceClient.fromConnectionString(envs_1.envs.AZURE_STORAGE_CONNECTION_STRING);
class ImageController {
    constructor() {
        this.restauranteImg = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                const { buffer } = req.file;
                const containerClient = blobService.getContainerClient('restaurantes');
                yield containerClient.getBlockBlobClient(`${email}.jpg`).uploadData(buffer);
                res.json({ message: "Success" });
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.usuariosImg = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                console.log(req.file);
                const { buffer } = req.file;
                const containerClient = blobService.getContainerClient('usuarios');
                yield containerClient.getBlockBlobClient(`${email}.jpg`).uploadData(buffer);
                res.json({ message: "Success" });
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.getBlobRestaurantes = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.params;
                console.log(email);
                const containerClient = blobService.getContainerClient('restaurantes');
                res.header("Content-Type", "image/jpg");
                const response = yield containerClient.getBlockBlobClient(`${email}.jpg`).downloadToBuffer();
                res.send(response);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.getBlobUsuarios = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.params;
                const containerClient = blobService.getContainerClient('usuarios');
                res.header("Content-Type", "image/jpg");
                const response = yield containerClient.getBlockBlobClient(`${email}.jpg`).downloadToBuffer();
                res.send(response);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
}
exports.ImageController = ImageController;
