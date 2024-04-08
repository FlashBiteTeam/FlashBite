import { UserDto } from "../../dtos/auth/user.dto";
import { HistorialEntity } from "../../entities/historial.entity";
import { ReservaRepository } from "../../repository/reserva.repository";


export interface RestaurantGetRecordUseCase {
    execute(dto:UserDto): Promise<HistorialEntity[]>;
}

export class RestaurantGetRecord implements RestaurantGetRecordUseCase {
    constructor(private readonly repository: ReservaRepository) {}

    async execute(dto:UserDto): Promise<HistorialEntity[]> {
        const reservas = this.repository.getRestauranteHistorial(dto);
        return reservas;
    }
}