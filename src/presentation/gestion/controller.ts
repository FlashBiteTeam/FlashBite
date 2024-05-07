import {Request, Response} from 'express';
import { PaginationDto } from '../../domain/dtos/gestion/pagination.dto';
import { CustomError } from '../../domain/errors/custom.errors';
import { Usuario } from '../../data';
import { Restaurante } from '../../data/mysql/models/restaurante.models';
export class GestionController{

    private handleError = (error:unknown, res: Response) => {
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({error: error.message});
        }

        return res.status(500).json({error: 'Internal server error'});
    }

     getUsers = async (req:Request, res:Response)=>{
        const {page = 1, limit = 10} = req.query;
        const [error, paginationDto] = PaginationDto.create(+page,+limit);

        if(error) return res.status(400).json({error});
        try {
            const [total, usuarios] = await Promise.all([
                Usuario.count(),
                Usuario.findAll({
                    offset: (paginationDto!.page - 1) * paginationDto!.limit, 
                    limit: paginationDto!.limit, 
                    
                })
            ]);
        
            
            const nextPage = (paginationDto!.page + 1 <= Math.ceil(total / paginationDto!.limit)) ? `/api/flashbite/gestion/get/users?page=${paginationDto!.page + 1}&limit=${paginationDto!.limit}` : null;
            const prevPage = (paginationDto!.page- 1 > 0) ? `/api/flashbite/gestion/get/users?page=${paginationDto!.page - 1}&limit=${paginationDto!.limit}` : null;
        
            res.json (
                {
                page: page,
                limit: limit,
                total: total,
                next: nextPage,
                prev: prevPage,
                usuarios: usuarios 
                }
            );
        } catch (error) {
            console.error(error); // Registrar el error en la consola para depuración
            this.handleError(CustomError.internalServer('Internal server error'), res);
        }
    }
    
    getRestaurants = async (req:Request, res:Response)=>{
        const {page = 1, limit = 10} = req.query;
        const [error, paginationDto] = PaginationDto.create(+page,+limit);

        if(error) return res.status(400).json({error});
        try {
            const [total, restaurantes] = await Promise.all([
                Restaurante.count(),
                Restaurante.findAll({
                    offset: (paginationDto!.page - 1) * paginationDto!.limit, 
                    limit: paginationDto!.limit, 
                    
                })
            ]);
        
            
            const nextPage = (paginationDto!.page + 1 <= Math.ceil(total / paginationDto!.limit)) ? `/api/flashbite/gestion/get/restaurants?page=${paginationDto!.page + 1}&limit=${paginationDto!.limit}` : null;
            const prevPage = (paginationDto!.page- 1 > 0) ? `/api/flashbite/gestion/get/restaurants?page=${paginationDto!.page - 1}&limit=${paginationDto!.limit}` : null;
        
            res.json (
                {
                page: page,
                limit: limit,
                total: total,
                next: nextPage,
                prev: prevPage,
                restaurantes: restaurantes 
                }
            );
        } catch (error) {
            console.error(error); 
            this.handleError(CustomError.internalServer('Internal server error'), res);
        }
    }
    
    deleteUser = async (req: Request, res: Response) => {
        const { email } = req.body; 
    
        try {
            const deletedUsuario = await Usuario.destroy({
                where: {
                    email: email
                }
            });
    
            if (deletedUsuario) {
                return res.json({ message: 'Usuario eliminado correctamente' });
            } else {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }
        } catch (error) {
            console.error(error); 
            this.handleError(CustomError.internalServer('Internal server error'), res);
        }
    }
    deleteRestaurant = async (req: Request, res: Response) => {
        const { email } = req.body; 
    
        try {
            const deletedRestaurant = await Restaurante.destroy({
                where: {
                    email: email
                }
            });
    
            if (deletedRestaurant) {
                return res.json({ message: 'Restaurante eliminado correctamente' });
            } else {
                return res.status(404).json({ error: 'Restaurante no encontrado' });
            }
        } catch (error) {
            console.error(error); 
            this.handleError(CustomError.internalServer('Internal server error'), res);
        }
    }
}