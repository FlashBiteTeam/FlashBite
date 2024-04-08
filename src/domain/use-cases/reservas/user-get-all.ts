import { UserDto } from "../../dtos/auth/user.dto";
import { RestauranteDto } from "../../dtos/auth/restaurant.dto";
import { ReservaEntity } from "../../entities/reserva.entity";
import { RestauranteEntity } from "../../entities/restaurante.entity";
import { CustomError } from "../../errors/custom.errors";
import { ReservaRepository } from "../../repository/reserva.repository";

import { RestauranteRepository } from "../../repository/restaurante.repository";

export interface UserGetAllUseCase {
    execute(dto:UserDto): Promise<ReservaEntity[]>;
}

export class UserGetAll implements UserGetAllUseCase {
    constructor(private readonly repository: ReservaRepository) {}

    async execute(dto:UserDto): Promise<ReservaEntity[]> {
        const reservas = this.repository.findCurrentByUser(dto);
        return reservas;
    }
}