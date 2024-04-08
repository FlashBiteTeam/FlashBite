import { ReservaDatasource } from "../../domain/datasources/reserva.datasource";
import { AgreeReservationDto } from "../../domain/dtos/reservas/agree-reservation.dto";
import { FinishReservationDto } from "../../domain/dtos/reservas/finish-reservation.dto";
import { CrearReservaDto } from "../../domain/dtos/reservas/reserva-crear.dto";
import { RestauranteDto } from "../../domain/dtos/auth/restaurant.dto";
import { ReservaEntity } from "../../domain/entities/reserva.entity";
import { ReservaRepository } from "../../domain/repository/reserva.repository";
import { ResenaDto } from "../../domain/dtos/reservas/resena.dto";

export class ReservaRepositoryImpl implements ReservaRepository{

    constructor(
        private readonly reservaDatasource:ReservaDatasource
    ){}
    resenar(dto: ResenaDto): Promise<String> {
        return this.reservaDatasource.resenar(dto);
    }
    getAgreed(dto: RestauranteDto): Promise<ReservaEntity[]> {
        return this.reservaDatasource.getAgreed(dto);
    }
    setStateToTwo(dto: AgreeReservationDto): Promise<ReservaEntity> {
        return this.reservaDatasource.setStateToTwo(dto);
    }

    createReserva(dto:CrearReservaDto): Promise<ReservaEntity> {
        return this.reservaDatasource.createReserva(dto);
    }
    
    findCurrentByRestaurant(dto:RestauranteDto): Promise<ReservaEntity[]> {
        return this.reservaDatasource.findCurrentByRestaurant(dto)

    }
    finishReservation(dto: FinishReservationDto): Promise<String> {
        return this.reservaDatasource.finishReservation(dto)

    }
}