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
exports.GestionController = void 0;
const pagination_dto_1 = require("../../domain/dtos/gestion/pagination.dto");
const custom_errors_1 = require("../../domain/errors/custom.errors");
const data_1 = require("../../data");
const restaurante_models_1 = require("../../data/mysql/models/restaurante.models");
class GestionController {
    constructor() {
        this.handleError = (error, res) => {
            if (error instanceof custom_errors_1.CustomError) {
                return res.status(error.statusCode).json({ error: error.message });
            }
            return res.status(500).json({ error: 'Internal server error' });
        };
        this.getUsers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { page = 1, limit = 10 } = req.query;
            const [error, paginationDto] = pagination_dto_1.PaginationDto.create(+page, +limit);
            if (error)
                return res.status(400).json({ error });
            try {
                const [total, usuarios] = yield Promise.all([
                    data_1.Usuario.count(),
                    data_1.Usuario.findAll({
                        offset: (paginationDto.page - 1) * paginationDto.limit,
                        limit: paginationDto.limit,
                    })
                ]);
                const nextPage = (paginationDto.page + 1 <= Math.ceil(total / paginationDto.limit)) ? `/api/flashbite/gestion/get/users?page=${paginationDto.page + 1}&limit=${paginationDto.limit}` : null;
                const prevPage = (paginationDto.page - 1 > 0) ? `/api/flashbite/gestion/get/users?page=${paginationDto.page - 1}&limit=${paginationDto.limit}` : null;
                res.json({
                    page: page,
                    limit: limit,
                    total: total,
                    next: nextPage,
                    prev: prevPage,
                    usuarios: usuarios
                });
            }
            catch (error) {
                console.error(error); // Registrar el error en la consola para depuración
                this.handleError(custom_errors_1.CustomError.internalServer('Internal server error'), res);
            }
        });
        this.getRestaurants = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { page = 1, limit = 10 } = req.query;
            const [error, paginationDto] = pagination_dto_1.PaginationDto.create(+page, +limit);
            if (error)
                return res.status(400).json({ error });
            try {
                const [total, restaurantes] = yield Promise.all([
                    restaurante_models_1.Restaurante.count(),
                    restaurante_models_1.Restaurante.findAll({
                        offset: (paginationDto.page - 1) * paginationDto.limit,
                        limit: paginationDto.limit,
                    })
                ]);
                const nextPage = (paginationDto.page + 1 <= Math.ceil(total / paginationDto.limit)) ? `/api/flashbite/gestion/get/restaurants?page=${paginationDto.page + 1}&limit=${paginationDto.limit}` : null;
                const prevPage = (paginationDto.page - 1 > 0) ? `/api/flashbite/gestion/get/restaurants?page=${paginationDto.page - 1}&limit=${paginationDto.limit}` : null;
                res.json({
                    page: page,
                    limit: limit,
                    total: total,
                    next: nextPage,
                    prev: prevPage,
                    restaurantes: restaurantes
                });
            }
            catch (error) {
                console.error(error);
                this.handleError(custom_errors_1.CustomError.internalServer('Internal server error'), res);
            }
        });
        this.deleteUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            try {
                const deletedUsuario = yield data_1.Usuario.destroy({
                    where: {
                        email: email
                    }
                });
                if (deletedUsuario) {
                    return res.json({ message: 'Usuario eliminado correctamente' });
                }
                else {
                    return res.status(404).json({ error: 'Usuario no encontrado' });
                }
            }
            catch (error) {
                console.error(error);
                this.handleError(custom_errors_1.CustomError.internalServer('Internal server error'), res);
            }
        });
        this.deleteRestaurant = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            try {
                const deletedRestaurant = yield restaurante_models_1.Restaurante.destroy({
                    where: {
                        email: email
                    }
                });
                if (deletedRestaurant) {
                    return res.json({ message: 'Restaurante eliminado correctamente' });
                }
                else {
                    return res.status(404).json({ error: 'Restaurante no encontrado' });
                }
            }
            catch (error) {
                console.error(error);
                this.handleError(custom_errors_1.CustomError.internalServer('Internal server error'), res);
            }
        });
    }
}
exports.GestionController = GestionController;
