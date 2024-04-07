import { RestauranteDto } from "../../dtos/auth/restaurant.dto";
import { ReservaEntity } from "../../entities/reserva.entity";
import { RestauranteEntity } from "../../entities/restaurante.entity";
import { CustomError } from "../../errors/custom.errors";
import { ReservaRepository } from "../../repository/reserva.repository";

import { RestauranteRepository } from "../../repository/restaurante.repository";

export interface RestaurantGetAllUseCase {
    execute(dto:RestauranteDto): Promise<ReservaEntity[]>;
}

export class RestaurantGetAll implements RestaurantGetAllUseCase {
    constructor(private readonly repository: ReservaRepository) {}

    async execute(dto:RestauranteDto): Promise<ReservaEntity[]> {
        const reservas = this.repository.findCurrentByRestaurant(dto);
        return reservas;
    }
}