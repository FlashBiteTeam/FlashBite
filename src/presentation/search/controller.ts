import { CustomError } from "../../domain/errors/custom.errors";
import { RestauranteRepository } from "../../domain/repository/restaurante.repository";
import { SearchAll } from "../../domain/use-cases/search/get-all";
import { Request, Response } from "express";
import { SearchById } from "../../domain/use-cases/search/get-by-id";
export class SearchController{

    constructor(
        private readonly restauranteRepository:RestauranteRepository
    ){};

    private handleError = (error:unknown, res: Response) => {
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({error: error.message});
        }

        return res.status(500).json({error: 'Internal server error'});
    }

    getAll = (req:Request, res:Response)=>{
        new SearchAll(this.restauranteRepository).execute()
            .then(restaurantes => res.json({restaurantes}).status(200))
            .catch(error => this.handleError(error,res));
    }
    getRestauranteById = (req:Request, res:Response)=>{
        new SearchById(this.restauranteRepository).execute(req.params.id)
            .then(restaurante => res.json({restaurante}).status(200))
            .catch(error => this.handleError(error,res));
    }

}