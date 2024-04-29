import { CrearPlatoDto } from "../../domain/dtos/menu/create-plate.dto";
import { CustomError } from "../../domain/errors/custom.errors";
import { RestauranteRepository } from "../../domain/repository/restaurante.repository";
import {Request, Response} from 'express';
import { addPlate } from "../../domain/use-cases/menu/add-plate";
import { deletePlate } from "../../domain/use-cases/menu/delete-plate";
import { RestauranteDto } from "../../domain/dtos/auth/restaurant.dto";
import { getTypes } from "../../domain/use-cases/menu/get-types";
import { GetPlatesDto } from "../../domain/dtos/menu/get-plates";
import { getPlates } from "../../domain/use-cases/menu/get-plates";
export class MenuController{

    constructor(
        private readonly restauranteRepository: RestauranteRepository
    ){};

    private handleError = (error:unknown, res: Response) => {
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({error: error.message});
        }

        return res.status(500).json({error: 'Internal server error'});
    }

    addPlate = (req:Request, res:Response)=>{
        const [error, dto] = CrearPlatoDto.create(req.body);
        if(error) return res.status(400).json({error});
        new addPlate(this.restauranteRepository).execute(dto!)
            .then(plato => res.json({plato ,msg: 'Plato creado con exito!!'}))
            .catch(error => this.handleError(error,res))
    }
    
    deletePlate = (req:Request, res:Response)=>{
        const {name_plate, restaurante} = req.body;
        new deletePlate(this.restauranteRepository).execute(name_plate,restaurante)
            .then(plato => res.json({plato ,msg: 'Plato eliminado con exito!!'}))
            .catch(error => this.handleError(error,res))
    }

    getTypes = (req:Request, res:Response)=>{
        const [error, dto] = RestauranteDto.create(req.params.id);
        if(error) return res.status(400).json({error});
        new getTypes(this.restauranteRepository).execute(dto!)
            .then(tipos => res.json({tipos ,msg: 'Estos son los  tipos de comida en el menu del restaurante!!'}))
            .catch(error => this.handleError(error,res))
    }

    getPlates = (req:Request, res:Response)=>{
        const [error, dto] = GetPlatesDto.create(req.params.id,req.params.type);
        if(error) return res.status(400).json({error});
        new getPlates(this.restauranteRepository).execute(dto!)
            .then(platos => res.json({platos ,msg: `Estos son los platos pertenecientes a ${dto?.type} !!`}))
            .catch(error => this.handleError(error,res))
    }
     
 

    
    
    

    


   
    

}   