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


        return router;
    }

}