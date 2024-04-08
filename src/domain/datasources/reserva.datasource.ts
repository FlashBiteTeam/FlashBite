import { AgreeReservationDto } from "../dtos/reservas/agree-reservation.dto";
import { FinishReservationDto } from "../dtos/reservas/finish-reservation.dto";
import { CrearReservaDto } from "../dtos/reservas/reserva-crear.dto";
import { RestauranteDto } from "../dtos/auth/restaurant.dto";
import { ReservaEntity } from "../entities/reserva.entity";

export abstract class ReservaDatasource {
    
    abstract createReserva(dto:CrearReservaDto):Promise<ReservaEntity>;
    abstract findCurrentByRestaurant(dto: RestauranteDto): Promise<ReservaEntity[]>;
    abstract setStateToTwo(dto: AgreeReservationDto): Promise<ReservaEntity>;
    abstract getAgreed(dto: RestauranteDto): Promise<ReservaEntity[]>;
    abstract finishReservation(dto: FinishReservationDto): Promise<String>;

    
}
