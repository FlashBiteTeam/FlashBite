import { CustomError } from "../../domain/errors/custom.errors";
import { RestauranteRepository } from "../../domain/repository/restaurante.repository";
import {Request, Response} from 'express';
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

       res.json({test: 'test'});
    }
    
    deletePlate = (req:Request, res:Response)=>{

        res.json({test: 'test'});
    }

    getTypes = (req:Request, res:Response)=>{

       res.json({test: 'test'});
    }

    getPlates = (req:Request, res:Response)=>{

        res.json({test: 'test'});
    }
     
 

    
    
    

    


   
    

}   