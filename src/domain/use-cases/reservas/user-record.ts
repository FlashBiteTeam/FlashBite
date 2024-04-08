import { UserDto } from "../../dtos/auth/user.dto";
import { HistorialEntity } from "../../entities/historial.entity";
import { ReservaRepository } from "../../repository/reserva.repository";


export interface UserGetRecordUseCase {
    execute(dto:UserDto): Promise<HistorialEntity[]>;
}

export class UserGetRecord implements UserGetRecordUseCase {
    constructor(private readonly repository: ReservaRepository) {}

    async execute(dto:UserDto): Promise<HistorialEntity[]> {
        const reservas = this.repository.getUserHistorial(dto);
        return reservas;
    }
}