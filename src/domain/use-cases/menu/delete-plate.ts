import { CrearPlatoDto } from "../../dtos/menu/create-plate.dto";
import { MenuEntity } from "../../entities/menu.entity";
import { RestauranteRepository } from "../../repository/restaurante.repository";

export interface deletePlateUseCase {
    execute(namePlate:string,restaurante:string): Promise<MenuEntity>;
}

export class deletePlate implements deletePlateUseCase {
    constructor(private readonly repository: RestauranteRepository) {}

    async execute(namePlate:string,restaurante:string): Promise<MenuEntity> {
        const menu = this.repository.deletePate(namePlate,restaurante);
        return menu;
    }
}