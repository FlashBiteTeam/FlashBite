import { ReservaDatasource } from "../../domain/datasources/reserva.datasource";
import { CrearReservaDto } from "../../domain/dtos/auth/reserva-crear.dto";
import { ReservaEntity } from "../../domain/entities/reserva.entity";
import { ReservaRepository } from "../../domain/repository/reserva.repository";

export class ReservaRepositoryImpl implements ReservaRepository{

    constructor(
        private readonly reservaDatasource:ReservaDatasource
    ){}

    createReserva(dto:CrearReservaDto): Promise<ReservaEntity> {
        return this.reservaDatasource.createReserva(dto);
    }
    
}