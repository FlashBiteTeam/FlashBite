import { AgreeReservationDto } from "../dtos/auth/agree-reservation.dto";
import { RegisterRestauranteDto } from "../dtos/auth/register-restaurante";
import { CrearReservaDto } from "../dtos/auth/reserva-crear.dto";
import { RestauranteDto } from "../dtos/auth/restaurant.dto";
import { VerifyOTPDto } from "../dtos/auth/verify-otp.dtp.t";
import { ReservaEntity } from "../entities/reserva.entity";
import { RestauranteEntity } from "../entities/restaurante.entity";

export abstract class ReservaRepository {
    abstract createReserva(dto:CrearReservaDto):Promise<ReservaEntity>;
    abstract findCurrentByRestaurant(dto: RestauranteDto): Promise<ReservaEntity[]>;
    abstract setStateToTwo(dto: AgreeReservationDto): Promise<ReservaEntity>;
    abstract getAgreed(dto: RestauranteDto): Promise<ReservaEntity[]>;

}
