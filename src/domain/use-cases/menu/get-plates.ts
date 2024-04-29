import { RestauranteDto } from "../../dtos/auth/restaurant.dto";
import { GetPlatesDto } from "../../dtos/menu/get-plates";
import { MenuEntity } from "../../entities/menu.entity";
import { RestauranteRepository } from "../../repository/restaurante.repository";

export interface getPlatesUseCase {
    execute(dto:RestauranteDto): Promise<MenuEntity[] | null>;
}

export class getPlates implements getPlatesUseCase {
    constructor(private readonly repository: RestauranteRepository) {}

    async execute(dto: GetPlatesDto): Promise<MenuEntity[] | null> {
        const plates = await this.repository.getPlates(dto);
    
        if (!plates) {
            
            throw 'No se encontraron platos para el tipo y email';
        }
        
        return plates;
    }
}