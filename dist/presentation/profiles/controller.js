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
exports.ProfileController = void 0;
const restaurante_models_1 = require("../../data/mysql/models/restaurante.models");
const data_1 = require("../../data");
class ProfileController {
    constructor() {
        this.editRestaurantInfo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            const updatedInfo = req.body;
            try {
                const [updatedRowsCount] = yield restaurante_models_1.Restaurante.update(updatedInfo, {
                    where: {
                        email: email
                    }
                });
                if (updatedRowsCount > 0) {
                    return res.json({ message: 'Información del restaurante actualizada correctamente' });
                }
                else {
                    return res.status(404).json({ error: 'Restaurante no encontrado' });
                }
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
        this.editUserInfo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            const updatedInfo = req.body;
            try {
                const [updatedRowsCount] = yield data_1.Usuario.update(updatedInfo, {
                    where: {
                        email: email
                    }
                });
                if (updatedRowsCount > 0) {
                    return res.json({ message: 'Información del Usuario actualizada correctamente' });
                }
                else {
                    return res.status(404).json({ error: 'Usuario no encontrado' });
                }
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
        this.getUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const email = req.params.email;
            try {
                const User = yield data_1.Usuario.findOne({
                    where: {
                        email: email
                    }
                });
                if (User) {
                    return res.json({ User }).status(200);
                }
                else {
                    return res.status(404).json({ error: 'Usuario no encontrado' });
                }
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
}
exports.ProfileController = ProfileController;
