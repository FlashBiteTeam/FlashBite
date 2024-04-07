
import { CrearReservaDto } from "../../dtos/auth/reserva-crear.dto";
import { ReservaEntity } from "../../entities/reserva.entity";
import { ReservaRepository } from "../../repository/reserva.repository";

export interface CrearReservaUseCase{
    execute(dto:CrearReservaDto):Promise<ReservaEntity>
}

export class CrearReserva implements CrearReservaUseCase{

    constructor(
        private readonly repository: ReservaRepository,
    ){}
    execute(dto: CrearReservaDto): Promise<ReservaEntity> {
        return this.repository.createReserva(dto);
    }

}