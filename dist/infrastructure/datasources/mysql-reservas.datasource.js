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
exports.MysqlReservaDatasource = void 0;
const data_1 = require("../../data");
const historialRestaurante_1 = require("../../data/mysql/models/historialRestaurante");
const historialUsuarios_1 = require("../../data/mysql/models/historialUsuarios");
const reserva_1 = require("../../data/mysql/models/reserva");
const restaurante_models_1 = require("../../data/mysql/models/restaurante.models");
const domain_1 = require("../../domain");
const historial_entity_1 = require("../../domain/entities/historial.entity");
const reserva_entity_1 = require("../../domain/entities/reserva.entity");
const restaurante_entity_1 = require("../../domain/entities/restaurante.entity");
const custom_errors_1 = require("../../domain/errors/custom.errors");
class MysqlReservaDatasource {
    getUserHistorial(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const historial = yield historialUsuarios_1.HistorialUsuario.findAll({
                    where: {
                        id_usuario: dto.id
                    }
                });
                if (historial.length === 0) {
                    throw custom_errors_1.CustomError.badRequest("No Hay reservas en el historial del Usuario");
                }
                return historial.map(element => historial_entity_1.HistorialEntity.fromObject(element));
            }
            catch (error) {
                throw (error);
            }
        });
    }
    getRestauranteHistorial(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const historial = yield historialRestaurante_1.HistorialRestaurante.findAll({
                    where: {
                        id_restaurante: dto.id
                    }
                });
                if (historial.length === 0) {
                    throw custom_errors_1.CustomError.badRequest("No Hay reservas en el historial del Usuario");
                }
                return historial.map(element => historial_entity_1.HistorialEntity.fromObject(element));
            }
            catch (error) {
                throw (error);
            }
        });
    }
    resenar(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(dto);
                yield historialUsuarios_1.HistorialUsuario.update(Object.assign(Object.assign({}, dto), { estado: '2' }), { where: { id_usuario: dto.emailUsuario, id_restaurante: dto.emailRestaurante, hora: dto.hora, fecha: dto.fecha } });
                yield historialRestaurante_1.HistorialRestaurante.update(Object.assign({}, dto), { where: { id_usuario: dto.emailUsuario, id_restaurante: dto.emailRestaurante, hora: dto.hora, fecha: dto.fecha } });
                return 'Reseña realizada';
            }
            catch (error) {
                throw (error);
            }
        });
    }
    getAgreed(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reservas = yield reserva_1.Reserva.findAll({
                    where: {
                        id_restaurante: dto.id,
                        estado: '2',
                    }
                });
                if (reservas.length === 0) {
                    throw custom_errors_1.CustomError.badRequest("No Hay reservas acordadas en el momento");
                }
                return reservas.map(reserva => reserva_entity_1.ReservaEntity.fromObject(reserva));
            }
            catch (error) {
                throw (error);
            }
        });
    }
    setStateToTwo(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reserva = yield reserva_1.Reserva.findOne({
                    where: {
                        id_usuario: dto.emailUsuario,
                        id_restaurante: dto.emailRestaurante
                    }
                });
                if (!reserva) {
                    throw custom_errors_1.CustomError.notFound('Reserva no encontrada');
                }
                yield reserva_1.Reserva.update({ estado: '2' }, { where: { id_usuario: dto.emailUsuario, id_restaurante: dto.emailRestaurante } });
                const reservaActualizada = yield reserva_1.Reserva.findOne({
                    where: {
                        id_usuario: dto.emailUsuario,
                        id_restaurante: dto.emailRestaurante
                    }
                });
                const reservaActualizadaEntity = reserva_entity_1.ReservaEntity.fromObject(reservaActualizada);
                return reservaActualizadaEntity;
            }
            catch (error) {
                throw (error);
            }
        });
    }
    createReserva(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usuario = yield data_1.Usuario.findByPk(dto.usuario);
                const restaurante = yield restaurante_models_1.Restaurante.findByPk(dto.restaurante);
                if (!usuario || !restaurante) {
                    throw custom_errors_1.CustomError.badRequest('Usuario o Restaurante no encontrado');
                }
                const usuarioEntity = domain_1.UsuarioEntity.fromObject(usuario);
                const restauranteEntity = restaurante_entity_1.RestauranteEntity.fromObject(restaurante);
                const existingReserva = yield reserva_1.Reserva.findOne({
                    where: {
                        id_usuario: usuarioEntity.email,
                        id_restaurante: restauranteEntity.email
                    }
                });
                if (existingReserva) {
                    throw custom_errors_1.CustomError.badRequest('Ya existe una reserva para este usuario y restaurante');
                }
                const reserva = yield reserva_1.Reserva.create({
                    id_usuario: usuarioEntity.email,
                    id_restaurante: restauranteEntity.email,
                    hora: dto.hora,
                    fecha: dto.fecha
                });
                const reservaResult = reserva_entity_1.ReservaEntity.fromObject(reserva);
                return reservaResult;
            }
            catch (error) {
                throw (error);
            }
        });
    }
    findCurrentByUser(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reservas = yield reserva_1.Reserva.findAll({
                    where: {
                        id_usuario: dto.id
                    }
                });
                if (reservas.length === 0) {
                    throw custom_errors_1.CustomError.badRequest("No Hay reservas en el momento para el usuario");
                }
                return reservas.map(reserva => reserva_entity_1.ReservaEntity.fromObject(reserva));
            }
            catch (error) {
                throw (error);
            }
        });
    }
    findCurrentByRestaurant(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reservas = yield reserva_1.Reserva.findAll({
                    where: {
                        id_restaurante: dto.id
                    }
                });
                if (reservas.length === 0) {
                    throw custom_errors_1.CustomError.badRequest("No Hay reservas en el momento");
                }
                return reservas.map(reserva => reserva_entity_1.ReservaEntity.fromObject(reserva));
            }
            catch (error) {
                throw (error);
            }
        });
    }
    finishReservation(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let foundReserva = yield reserva_1.Reserva.findOne({
                    where: {
                        id_usuario: dto.emailUsuario,
                        id_restaurante: dto.emailRestaurante
                    }
                });
                console.log(foundReserva);
                const reservas = yield reserva_1.Reserva.destroy({
                    where: {
                        id_restaurante: dto.emailRestaurante,
                        id_usuario: dto.emailUsuario,
                        estado: '2'
                    }
                });
                const ReservaHistorial = historial_entity_1.HistorialEntity.fromObject(foundReserva);
                const historialUsuario = yield historialUsuarios_1.HistorialUsuario.create(Object.assign(Object.assign({}, ReservaHistorial), { estado: '1' }));
                const historialRestaurante = yield historialRestaurante_1.HistorialRestaurante.create(Object.assign(Object.assign({}, ReservaHistorial), { estado: '1' }));
                return 'Reservación finalizada y pendiente por realimentación';
            }
            catch (error) {
                throw (error);
            }
        });
    }
}
exports.MysqlReservaDatasource = MysqlReservaDatasource;
