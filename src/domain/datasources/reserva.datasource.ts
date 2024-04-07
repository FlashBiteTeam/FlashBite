import { CrearReservaDto } from "../dtos/auth/reserva-crear.dto";
import { ReservaEntity } from "../entities/reserva.entity";

export abstract class ReservaDatasource {
    
    abstract createReserva(dto:CrearReservaDto):Promise<ReservaEntity>;


}
