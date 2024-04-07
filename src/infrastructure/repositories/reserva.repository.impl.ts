import { ReservaDatasource } from "../../domain/datasources/reserva.datasource";
import { AgreeReservationDto } from "../../domain/dtos/auth/agree-reservation.dto";
import { CrearReservaDto } from "../../domain/dtos/auth/reserva-crear.dto";
import { RestauranteDto } from "../../domain/dtos/auth/restaurant.dto";
import { ReservaEntity } from "../../domain/entities/reserva.entity";
import { ReservaRepository } from "../../domain/repository/reserva.repository";

export class ReservaRepositoryImpl implements ReservaRepository{

    constructor(
        private readonly reservaDatasource:ReservaDatasource
    ){}
    setStateToTwo(dto: AgreeReservationDto): Promise<ReservaEntity> {
        return this.reservaDatasource.setStateToTwo(dto);
    }

    createReserva(dto:CrearReservaDto): Promise<ReservaEntity> {
        return this.reservaDatasource.createReserva(dto);
    }
    
    async findCurrentByRestaurant(dto:RestauranteDto): Promise<ReservaEntity[]> {
        return this.reservaDatasource.findCurrentByRestaurant(dto)

    }
}