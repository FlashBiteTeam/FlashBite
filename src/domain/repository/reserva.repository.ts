import { AgreeReservationDto } from "../dtos/reservas/agree-reservation.dto";
import { FinishReservationDto } from "../dtos/reservas/finish-reservation.dto";
import { RegisterRestauranteDto } from "../dtos/auth/register-restaurante";
import { CrearReservaDto } from "../dtos/reservas/reserva-crear.dto";
import { RestauranteDto } from "../dtos/auth/restaurant.dto";
import { VerifyOTPDto } from "../dtos/auth/verify-otp.dtp.t";
import { ReservaEntity } from "../entities/reserva.entity";
import { RestauranteEntity } from "../entities/restaurante.entity";
import { ResenaDto } from "../dtos/reservas/resena.dto";
import { UserDto } from "../dtos/auth/user.dto";
import { HistorialEntity } from "../entities/historial.entity";

export abstract class ReservaRepository {
    abstract createReserva(dto:CrearReservaDto):Promise<ReservaEntity>;
    abstract findCurrentByRestaurant(dto: RestauranteDto): Promise<ReservaEntity[]>;
    abstract setStateToTwo(dto: AgreeReservationDto): Promise<ReservaEntity>;
    abstract getAgreed(dto: RestauranteDto): Promise<ReservaEntity[]>;
    abstract finishReservation(dto: FinishReservationDto): Promise<String>;
    abstract resenar(dto: ResenaDto): Promise<String>;
    abstract findCurrentByUser(dto: UserDto): Promise<ReservaEntity[]>
    abstract getUserHistorial(dto: UserDto): Promise<HistorialEntity[]>
    abstract getRestauranteHistorial(dto: RestauranteDto): Promise<HistorialEntity[]>

}
