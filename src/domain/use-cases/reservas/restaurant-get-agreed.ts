import { RestauranteDto } from "../../dtos/auth/restaurant.dto";
import { ReservaEntity } from "../../entities/reserva.entity";
import { ReservaRepository } from "../../repository/reserva.repository";

export interface RestaurantGetAgreedlUseCase {
    execute(dto:RestauranteDto): Promise<ReservaEntity[]>;
}

export class RestaurantGetAgreed implements RestaurantGetAgreedlUseCase {
    constructor(private readonly repository: ReservaRepository) {}

    async execute(dto:RestauranteDto): Promise<ReservaEntity[]> {
        const reservasAcordadas = this.repository.getAgreed(dto);
        return reservasAcordadas;
    }
}