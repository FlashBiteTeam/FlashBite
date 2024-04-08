import { FinishReservationDto } from "../../dtos/reservas/finish-reservation.dto";
import { RestauranteDto } from "../../dtos/auth/restaurant.dto";
import { ReservaEntity } from "../../entities/reserva.entity";
import { ReservaRepository } from "../../repository/reserva.repository";

export interface FinishReservationUseCase {
    execute(dto:FinishReservationDto): Promise<String>;
}

export class FinishReservation implements FinishReservationUseCase  {
    constructor(private readonly repository: ReservaRepository) {}

    async execute(dto:FinishReservationDto): Promise<String> {
        return this.repository.finishReservation(dto);
    }
}