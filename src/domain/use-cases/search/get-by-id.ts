import { RestauranteEntity } from "../../entities/restaurante.entity";
import { CustomError } from "../../errors/custom.errors";

import { RestauranteRepository } from "../../repository/restaurante.repository";

export interface SearchByIdUseCase {
    execute(id:string): Promise<RestauranteEntity | null>;
}

export class SearchById implements SearchByIdUseCase {
    constructor(private readonly repository: RestauranteRepository) {}

    async execute(id:string): Promise<RestauranteEntity | null> {
        try {
            const restaurante = this.repository.findOne(id,true);
            return restaurante;
        } catch (error) {
            throw CustomError.badRequest('There was an error');
        }
    }
}