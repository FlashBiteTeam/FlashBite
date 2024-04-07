import { CrearReservaDto } from "../../domain/dtos/auth/reserva-crear.dto";
import { RestauranteDto } from "../../domain/dtos/auth/restaurant.dto";
import { CustomError } from "../../domain/errors/custom.errors";
import { ReservaRepository } from "../../domain/repository/reserva.repository";
import { CrearReserva } from "../../domain/use-cases/reservas/create";
import { Request, Response } from "express";
import { RestaurantGetAll } from "../../domain/use-cases/reservas/restaurant-get-all";
import { AgreeReservationDto } from "../../domain/dtos/auth/agree-reservation.dto";
import { SetToTwo } from "../../domain/use-cases/reservas/set-to-two";
export class ReservasController{

    constructor(
        private readonly reservaRepository:ReservaRepository
    ){};

    private handleError = (error:unknown, res: Response) => {
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({error: error.message});
        }

        return res.status(500).json({error: 'Internal server error'});
    }

    public create = (req:Request, res:Response)=>{
        const [error, crearReservaDto] = CrearReservaDto.create(req.body);
        console.log(crearReservaDto)
        if(error) return res.status(400).json({error});
        
        new CrearReserva(this.reservaRepository).execute(crearReservaDto!)
            .then(reserva => res.json({reserva:reserva,msg: 'Reserva creada con exito!!'}))
            .catch(error => this.handleError(error,res))
    }

    public reservasActualesRestaurante = (req:Request, res:Response)=>{
        const [error,restaureDTO] = RestauranteDto.create(req.params.id); 
        if(error) return res.status(400).json({error});
        new RestaurantGetAll(this.reservaRepository).execute(restaureDTO!)
            .then(reservas => res.json({reservas:reservas,msg: `Estas son las reservas para el restaurante ${req.params.id}`}))
            .catch(error => this.handleError(error,res))
    
    }
    public aceptarReserva = (req:Request, res:Response)=>{
        const [error,agreeReservationDto] = AgreeReservationDto.create(req.body); 
        if(error) return res.status(400).json({error});
        new SetToTwo(this.reservaRepository).execute(agreeReservationDto!)
        .then(reserva => res.json({reserva,msg: `Reserva Acordada exitosamente`}))
        .catch(error => this.handleError(error,res))

    
    }
}