import { CrearReservaDto } from "../../domain/dtos/reservas/reserva-crear.dto";
import { RestauranteDto } from "../../domain/dtos/auth/restaurant.dto";
import { CustomError } from "../../domain/errors/custom.errors";
import { ReservaRepository } from "../../domain/repository/reserva.repository";
import { CrearReserva } from "../../domain/use-cases/reservas/create";
import { Request, Response } from "express";
import { RestaurantGetAll } from "../../domain/use-cases/reservas/restaurant-get-all";
import { AgreeReservationDto } from "../../domain/dtos/reservas/agree-reservation.dto";
import { SetToTwo } from "../../domain/use-cases/reservas/set-to-two";
import { RestaurantGetAgreed } from "../../domain/use-cases/reservas/restaurant-get-agreed";
import { FinishReservationDto } from "../../domain/dtos/reservas/finish-reservation.dto";
import { FinishReservation } from "../../domain/use-cases/reservas/finish-reservation";
import { ResenaDto } from "../../domain/dtos/reservas/resena.dto";
import { Resenar } from "../../domain/use-cases/reservas/resenar";
import { UserDto } from "../../domain/dtos/auth/user.dto";
import { UserGetAll } from "../../domain/use-cases/reservas/user-get-all";
import { UserGetRecord } from "../../domain/use-cases/reservas/user-record";
import { RestaurantGetRecord } from "../../domain/use-cases/reservas/restaurant-record";
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

    //* Crear reserva por el Usuario
     create = (req:Request, res:Response)=>{
        const [error, crearReservaDto] = CrearReservaDto.create(req.body);
        console.log(crearReservaDto)
        if(error) return res.status(400).json({error});
        
        new CrearReserva(this.reservaRepository).execute(crearReservaDto!)
            .then(reserva => res.json({reserva:reserva,msg: 'Reserva creada con exito!!'}))
            .catch(error => this.handleError(error,res))
    }

    //* Mirar las reservas Actuales de un restaurante
     reservasActualesRestaurante = (req:Request, res:Response)=>{
        const [error,restaureDTO] = RestauranteDto.create(req.params.id); 
        if(error) return res.status(400).json({error});
        new RestaurantGetAll(this.reservaRepository).execute(restaureDTO!)
            .then(reservas => res.json({reservas:reservas,msg: `Estas son las reservas para el restaurante ${req.params.id}`}))
            .catch(error => this.handleError(error,res))
    
    }
    

    //* Restaurante Aceptar Reserva
     aceptarReserva = (req:Request, res:Response)=>{
        const [error,agreeReservationDto] = AgreeReservationDto.create(req.body); 
        if(error) return res.status(400).json({error});
        new SetToTwo(this.reservaRepository).execute(agreeReservationDto!)
        .then(reserva => res.json({reserva,msg: `Reserva Acordada exitosamente`}))
        .catch(error => this.handleError(error,res))

    }

    //* Reservas de un Restaurante Aceptadas
     reservasAceptadas = (req:Request, res:Response)=>{
        const [error,restauranteDTO] = RestauranteDto.create(req.params.id); 
        if(error) return res.status(400).json({error});

        new RestaurantGetAgreed(this.reservaRepository).execute(restauranteDTO!)
        .then(reservas => res.json({reservas:reservas,msg: `Estas son tus reservas acordadas`}))
        .catch(error => this.handleError(error,res))

    }
    
    //* Terminar Reserva de restaurante
     finalizarReserva = (req:Request, res:Response)=>{
        const [error,finishReservationDto] = FinishReservationDto.create(req.body); 
        if(error) return res.status(400).json({error});

        new FinishReservation(this.reservaRepository).execute(finishReservationDto!)
        .then(msg => res.json({msg}))
        .catch(error => this.handleError(error,res))

    }

    //* Usuario califica y comenta una reserva
     resenarReserva = (req:Request, res:Response)=>{
        const [error,resenaDto] = ResenaDto.create(req.body);
 
        if(error) return res.status(400).json({error});

        new Resenar(this.reservaRepository).execute(resenaDto!)
            .then(msg => res.json({msg}))
            .catch(error => this.handleError(error,res))

    }

    //* Traer todas las reservas actuales del Usuario

     reservasActualesUsuario = (req:Request, res:Response)=>{
        const [error,userDTO] = UserDto.create(req.params.id); 
        if(error) return res.status(400).json({error});
        new UserGetAll(this.reservaRepository).execute(userDTO!)
            .then(reservas => res.json({reservas:reservas,msg: `Estas son las reservas para el usuario ${req.params.id}`}))
            .catch(error => this.handleError(error,res))
    
    }
    
    //* Traer Historial del usuario
     historialUsuario = (req:Request, res:Response)=>{
        const [error,userDTO] = UserDto.create(req.params.id); 
        if(error) return res.status(400).json({error});
        new UserGetRecord(this.reservaRepository).execute(userDTO!)
            .then(reservas => res.json({reservas:reservas,msg: `Estas son tus reservas pasadas ${req.params.id}`}))
            .catch(error => this.handleError(error,res))
    
    }

    //* Traer Historial del restaurante
     historialRestaurante = (req:Request, res:Response)=>{
        const [error,restauranteDTO] = RestauranteDto.create(req.params.id); 
        if(error) return res.status(400).json({error});
        new RestaurantGetRecord(this.reservaRepository).execute(restauranteDTO!)
            .then(reservas => res.json({reservas:reservas,msg: `Estas son tus reservas pasadas ${req.params.id}`}))
            .catch(error => this.handleError(error,res))
    
    }

}   