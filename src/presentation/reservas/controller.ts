import { CrearReservaDto } from "../../domain/dtos/auth/reserva-crear.dto";
import { CustomError } from "../../domain/errors/custom.errors";
import { ReservaRepository } from "../../domain/repository/reserva.repository";
import { RestauranteRepository } from "../../domain/repository/restaurante.repository";
import { CrearReserva } from "../../domain/use-cases/reservas/create";
import { SearchAll } from "../../domain/use-cases/search/get-all";
import { Request, Response } from "express";
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

}