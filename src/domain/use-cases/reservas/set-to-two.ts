import { AgreeReservationDto } from "../../dtos/auth/agree-reservation.dto";
import { RestauranteDto } from "../../dtos/auth/restaurant.dto";
import { ReservaEntity } from "../../entities/reserva.entity";
import { RestauranteEntity } from "../../entities/restaurante.entity";
import { CustomError } from "../../errors/custom.errors";
import { ReservaRepository } from "../../repository/reserva.repository";

import { RestauranteRepository } from "../../repository/restaurante.repository";

export interface SetToTwoUseCase {
    execute(dto:AgreeReservationDto): Promise<ReservaEntity>;
}

export class SetToTwo implements SetToTwoUseCase {
    constructor(private readonly repository: ReservaRepository) {}

    async execute(dto:AgreeReservationDto): Promise<ReservaEntity> {
        const reserva = this.repository.setStateToTwo(dto);
        return reserva;
    }
}