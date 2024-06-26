import { Router } from "express";
import { RestauranteRepositoryImpl } from "../../infrastructure/repositories/restaurante.repository.impl";
import { MysqlRestauranteDatasource } from "../../infrastructure/datasources/mysql-restaurante.datasource";
import { ReservasController } from "./controller";
import { MysqlReservaDatasource } from "../../infrastructure/datasources/mysql-reservas.datasource";
import { ReservaRepositoryImpl } from "../../infrastructure/repositories/reserva.repository.impl";

export class ReservasRoutes{

    static get routes():Router{

        const router = Router();

        const reservaDatasource = new MysqlReservaDatasource();
        const ReservaRepository = new ReservaRepositoryImpl(reservaDatasource);
        const controllerReservas = new ReservasController(ReservaRepository);

        router.post('/create',controllerReservas.create)
        router.get('/restaurant/current-reservations/:id',controllerReservas.reservasActualesRestaurante)
        router.post('/restaurant/agree/',controllerReservas.aceptarReserva)
        router.get('/restaurant/agreed-reservations/:id',controllerReservas.reservasAceptadas)
        router.post('/restaurant/end-reservations/',controllerReservas.finalizarReserva)
        router.post('/user/review',controllerReservas.resenarReserva)
        router.get('/user/current-reservations/:id',controllerReservas.reservasActualesUsuario)

        router.get('/user/record/:id',controllerReservas.historialUsuario)
        router.get('/restaurant/record/:id',controllerReservas.historialRestaurante)



        return router;
    }

}