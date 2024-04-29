import { CrearPlatoDto } from "../../dtos/menu/create-plate.dto";
import { MenuEntity } from "../../entities/menu.entity";
import { RestauranteRepository } from "../../repository/restaurante.repository";

export interface addPlateUseCase {
    execute(dto:CrearPlatoDto): Promise<MenuEntity>;
}

export class addPlate implements addPlateUseCase {
    constructor(private readonly repository: RestauranteRepository) {}

    async execute(dto:CrearPlatoDto): Promise<MenuEntity> {
        const menu = this.repository.createPlate(dto);
        return menu;
    }
    
}