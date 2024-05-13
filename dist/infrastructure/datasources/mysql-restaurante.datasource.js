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
exports.MysqlRestauranteDatasource = void 0;
const sequelize_1 = require("sequelize");
const historialRestaurante_1 = require("../../data/mysql/models/historialRestaurante");
const restaurante_models_1 = require("../../data/mysql/models/restaurante.models");
const restaurante_entity_1 = require("../../domain/entities/restaurante.entity");
const menu_1 = require("../../data/mysql/models/menu");
const menu_entity_1 = require("../../domain/entities/menu.entity");
class MysqlRestauranteDatasource {
    findOne(email, emailValidado) {
        return __awaiter(this, void 0, void 0, function* () {
            const restaurante = yield restaurante_models_1.Restaurante.findOne({ where: { email: email, emailValidado: emailValidado } });
            if (restaurante)
                return restaurante_entity_1.RestauranteEntity.fromObject(restaurante);
            return null;
        });
    }
    createRestaurante(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(dto, 'CREATED Restaurante');
            const restauranteModel = {
                nombre: dto.nombre,
                direccion: dto.direccion,
                email: dto.email,
                nit: dto.nit,
                contrasena: dto.contrasena,
                numero: dto.numero,
                tipoComida: dto.tipoComida
            };
            const user = yield restaurante_models_1.Restaurante.create(restauranteModel);
            return restaurante_entity_1.RestauranteEntity.fromObject(user);
        });
    }
    validateEmail(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = dto;
            const user = yield restaurante_models_1.Restaurante.update({ emailValidado: true }, {
                where: { email },
                returning: true
            });
            if (user) {
                console.log(`Email validado para el usuario con email ${email}.`);
                return true;
            }
            else {
                console.log(`No se pudo validar el email para el usuario con email ${email}.`);
                return false;
            }
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const restaurantes = yield restaurante_models_1.Restaurante.findAll();
                const restaurantesEntities = [];
                for (const restaurante of restaurantes) {
                    const restauranteEntity = restaurante_entity_1.RestauranteEntity.fromObject(restaurante);
                    const promedio = yield historialRestaurante_1.HistorialRestaurante.findOne({
                        attributes: [[sequelize_1.Sequelize.fn('AVG', sequelize_1.Sequelize.col('calificacion')), 'promedio_calificacion']],
                        where: {
                            id_restaurante: restauranteEntity.email
                        }
                    });
                    const calificacionPromedio = (promedio === null || promedio === void 0 ? void 0 : promedio.get('promedio_calificacion')) || 0;
                    const calificacionPromedioString = calificacionPromedio.toString();
                    const restauranteConCalificacion = Object.assign(Object.assign({}, restauranteEntity), { calificacionPromedio: calificacionPromedioString });
                    restaurantesEntities.push(restauranteConCalificacion);
                }
                return restaurantesEntities;
            }
            catch (error) {
                console.error('Error al obtener los promedios de calificación:', error);
                throw error;
            }
        });
    }
    createPlate(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const menuModel = {
                    id_restaurante: dto.id_restaurante,
                    tipo: dto.tipo,
                    nombre_plato: dto.nombre_plato,
                    precio: dto.precio,
                    descripcion: dto.descripcion,
                };
                console.log(menuModel);
                const menu = yield menu_1.Menu.create(menuModel);
                return menu_entity_1.MenuEntity.fromObject(menu);
            }
            catch (error) {
                throw error;
            }
        });
    }
    deletePate(namePlate, restaurante) {
        return __awaiter(this, void 0, void 0, function* () {
            const menu = yield menu_1.Menu.findOne({
                where: {
                    nombre_plato: namePlate
                }
            });
            if (!menu) {
                throw new Error(`No se encontró ningún plato con el nombre ${namePlate}`);
            }
            const menuEntity = menu_entity_1.MenuEntity.fromObject(menu);
            yield menu_1.Menu.destroy({
                where: {
                    id_restaurante: restaurante,
                    nombre_plato: namePlate
                }
            });
            return menuEntity;
        });
    }
    getTypes(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const menu = yield menu_1.Menu.findAll({
                where: {
                    id_restaurante: id.id
                }
            });
            return menu.map(plate => menu_entity_1.MenuEntity.fromObject(plate));
        });
    }
    getPlates(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const menu = yield menu_1.Menu.findAll({
                where: {
                    id_restaurante: dto.id,
                    tipo: dto.type
                }
            });
            return menu.map(plate => menu_entity_1.MenuEntity.fromObject(plate));
        });
    }
}
exports.MysqlRestauranteDatasource = MysqlRestauranteDatasource;
