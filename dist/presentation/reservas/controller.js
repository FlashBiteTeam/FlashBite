"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservasController = void 0;
const reserva_crear_dto_1 = require("../../domain/dtos/reservas/reserva-crear.dto");
const restaurant_dto_1 = require("../../domain/dtos/auth/restaurant.dto");
const custom_errors_1 = require("../../domain/errors/custom.errors");
const create_1 = require("../../domain/use-cases/reservas/create");
const restaurant_get_all_1 = require("../../domain/use-cases/reservas/restaurant-get-all");
const agree_reservation_dto_1 = require("../../domain/dtos/reservas/agree-reservation.dto");
const set_to_two_1 = require("../../domain/use-cases/reservas/set-to-two");
const restaurant_get_agreed_1 = require("../../domain/use-cases/reservas/restaurant-get-agreed");
const finish_reservation_dto_1 = require("../../domain/dtos/reservas/finish-reservation.dto");
const finish_reservation_1 = require("../../domain/use-cases/reservas/finish-reservation");
const resena_dto_1 = require("../../domain/dtos/reservas/resena.dto");
const resenar_1 = require("../../domain/use-cases/reservas/resenar");
const user_dto_1 = require("../../domain/dtos/auth/user.dto");
const user_get_all_1 = require("../../domain/use-cases/reservas/user-get-all");
const user_record_1 = require("../../domain/use-cases/reservas/user-record");
const restaurant_record_1 = require("../../domain/use-cases/reservas/restaurant-record");
class ReservasController {
    constructor(reservaRepository) {
        this.reservaRepository = reservaRepository;
        this.handleError = (error, res) => {
            if (error instanceof custom_errors_1.CustomError) {
                return res.status(error.statusCode).json({ error: error.message });
            }
            return res.status(500).json({ error: 'Internal server error' });
        };
        //* Crear reserva por el Usuario
        this.create = (req, res) => {
            const [error, crearReservaDto] = reserva_crear_dto_1.CrearReservaDto.create(req.body);
            if (error)
                return res.status(400).json({ error });
            new create_1.CrearReserva(this.reservaRepository).execute(crearReservaDto)
                .then(reserva => res.json({ reserva: reserva, msg: 'Reserva creada con exito!!' }))
                .catch(error => this.handleError(error, res));
        };
        //* Mirar las reservas Actuales de un restaurante
        this.reservasActualesRestaurante = (req, res) => {
            const [error, restaureDTO] = restaurant_dto_1.RestauranteDto.create(req.params.id);
            if (error)
                return res.status(400).json({ error });
            new restaurant_get_all_1.RestaurantGetAll(this.reservaRepository).execute(restaureDTO)
                .then(reservas => res.json({ reservas: reservas, msg: `Estas son las reservas para el restaurante ${req.params.id}` }))
                .catch(error => this.handleError(error, res));
        };
        //* Restaurante Aceptar Reserva
        this.aceptarReserva = (req, res) => {
            const [error, agreeReservationDto] = agree_reservation_dto_1.AgreeReservationDto.create(req.body);
            if (error)
                return res.status(400).json({ error });
            new set_to_two_1.SetToTwo(this.reservaRepository).execute(agreeReservationDto)
                .then(reserva => res.json({ reserva, msg: `Reserva Acordada exitosamente` }))
                .catch(error => this.handleError(error, res));
        };
        //* Reservas de un Restaurante Aceptadas
        this.reservasAceptadas = (req, res) => {
            const [error, restauranteDTO] = restaurant_dto_1.RestauranteDto.create(req.params.id);
            if (error)
                return res.status(400).json({ error });
            new restaurant_get_agreed_1.RestaurantGetAgreed(this.reservaRepository).execute(restauranteDTO)
                .then(reservas => res.json({ reservas: reservas, msg: `Estas son tus reservas acordadas` }))
                .catch(error => this.handleError(error, res));
        };
        //* Terminar Reserva de restaurante
        this.finalizarReserva = (req, res) => {
            const [error, finishReservationDto] = finish_reservation_dto_1.FinishReservationDto.create(req.body);
            if (error)
                return res.status(400).json({ error });
            new finish_reservation_1.FinishReservation(this.reservaRepository).execute(finishReservationDto)
                .then(msg => res.json({ msg }))
                .catch(error => this.handleError(error, res));
        };
        //* Usuario califica y comenta una reserva
        this.resenarReserva = (req, res) => {
            const [error, resenaDto] = resena_dto_1.ResenaDto.create(req.body);
            if (error)
                return res.status(400).json({ error });
            new resenar_1.Resenar(this.reservaRepository).execute(resenaDto)
                .then(msg => res.json({ msg }))
                .catch(error => this.handleError(error, res));
        };
        //* Traer todas las reservas actuales del Usuario
        this.reservasActualesUsuario = (req, res) => {
            const [error, userDTO] = user_dto_1.UserDto.create(req.params.id);
            if (error)
                return res.status(400).json({ error });
            new user_get_all_1.UserGetAll(this.reservaRepository).execute(userDTO)
                .then(reservas => res.json({ reservas: reservas, msg: `Estas son las reservas para el usuario ${req.params.id}` }))
                .catch(error => this.handleError(error, res));
        };
        //* Traer Historial del usuario
        this.historialUsuario = (req, res) => {
            const [error, userDTO] = user_dto_1.UserDto.create(req.params.id);
            if (error)
                return res.status(400).json({ error });
            new user_record_1.UserGetRecord(this.reservaRepository).execute(userDTO)
                .then(reservas => res.json({ reservas: reservas, msg: `Estas son tus reservas pasadas ${req.params.id}` }))
                .catch(error => this.handleError(error, res));
        };
        //* Traer Historial del restaurante
        this.historialRestaurante = (req, res) => {
            const [error, restauranteDTO] = restaurant_dto_1.RestauranteDto.create(req.params.id);
            if (error)
                return res.status(400).json({ error });
            new restaurant_record_1.RestaurantGetRecord(this.reservaRepository).execute(restauranteDTO)
                .then(reservas => res.json({ reservas: reservas, msg: `Estas son tus reservas pasadas ${req.params.id}` }))
                .catch(error => this.handleError(error, res));
        };
    }
    ;
}
exports.ReservasController = ReservasController;
