import { AgreeReservationDto } from "../dtos/auth/agree-reservation.dto";
import { CrearReservaDto } from "../dtos/auth/reserva-crear.dto";
import { RestauranteDto } from "../dtos/auth/restaurant.dto";
import { ReservaEntity } from "../entities/reserva.entity";

export abstract class ReservaDatasource {
    
    abstract createReserva(dto:CrearReservaDto):Promise<ReservaEntity>;
    abstract findCurrentByRestaurant(dto: RestauranteDto): Promise<ReservaEntity[]>;
    abstract setStateToTwo(dto: AgreeReservationDto): Promise<ReservaEntity>;
     
    
}
