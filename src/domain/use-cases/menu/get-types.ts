import { RestauranteDto } from "../../dtos/auth/restaurant.dto";
import { MenuEntity } from "../../entities/menu.entity";
import { RestauranteRepository } from "../../repository/restaurante.repository";

export interface getTypesUseCase {
    execute(dto:RestauranteDto): Promise<string[] | null>;
}

export class getTypes implements getTypesUseCase {
    constructor(private readonly repository: RestauranteRepository) {}

    async execute(dto: RestauranteDto): Promise<string[] | null> {
        const menuItems = await this.repository.getTypes(dto);
    
        if (!menuItems) {
            return null;
        }
    
        const uniqueTypesSet = new Set<string>();
        menuItems.forEach(menuItem => {
            uniqueTypesSet.add(menuItem.tipo);
        });
    
        const uniqueTypesArray = Array.from(uniqueTypesSet);
    
        return uniqueTypesArray;
    }
}