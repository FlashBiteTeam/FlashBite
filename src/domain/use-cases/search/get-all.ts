import { Restaurante } from "../../../data/mysql/models/restaurante.models";
import { RestauranteEntity } from "../../entities/restaurante.entity";
import { CustomError } from "../../errors/custom.errors";

import { RestauranteRepository } from "../../repository/restaurante.repository";

export interface SearchAllUseCase {
    execute(): Promise<RestauranteEntity[]>;
}

export class SearchAll implements SearchAllUseCase {
    constructor(private readonly repository: RestauranteRepository) {}

    async execute(): Promise<RestauranteEntity[]> {
        try {
            const restaurantes = this.repository.findAll();;

            return restaurantes;
        } catch (error) {
            throw CustomError.badRequest('There was an error');
        }
    }
}