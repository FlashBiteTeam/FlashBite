"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservasRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const mysql_reservas_datasource_1 = require("../../infrastructure/datasources/mysql-reservas.datasource");
const reserva_repository_impl_1 = require("../../infrastructure/repositories/reserva.repository.impl");
class ReservasRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const reservaDatasource = new mysql_reservas_datasource_1.MysqlReservaDatasource();
        const ReservaRepository = new reserva_repository_impl_1.ReservaRepositoryImpl(reservaDatasource);
        const controllerReservas = new controller_1.ReservasController(ReservaRepository);
        router.post('/create', controllerReservas.create);
        router.get('/restaurant/current-reservations/:id', controllerReservas.reservasActualesRestaurante);
        router.post('/restaurant/agree/', controllerReservas.aceptarReserva);
        router.get('/restaurant/agreed-reservations/:id', controllerReservas.reservasAceptadas);
        router.post('/restaurant/end-reservations/', controllerReservas.finalizarReserva);
        router.post('/user/review', controllerReservas.resenarReserva);
        router.get('/user/current-reservations/:id', controllerReservas.reservasActualesUsuario);
        router.get('/user/record/:id', controllerReservas.historialUsuario);
        router.get('/restaurant/record/:id', controllerReservas.historialRestaurante);
        return router;
    }
}
exports.ReservasRoutes = ReservasRoutes;
