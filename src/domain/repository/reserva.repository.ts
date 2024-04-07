import { RegisterRestauranteDto } from "../dtos/auth/register-restaurante";
import { CrearReservaDto } from "../dtos/auth/reserva-crear.dto";
import { VerifyOTPDto } from "../dtos/auth/verify-otp.dtp.t";
import { ReservaEntity } from "../entities/reserva.entity";
import { RestauranteEntity } from "../entities/restaurante.entity";

export abstract class ReservaRepository {
    abstract createReserva(dto:CrearReservaDto):Promise<ReservaEntity>;
}
